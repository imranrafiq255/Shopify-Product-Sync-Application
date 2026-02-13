const crypto = require("crypto");
const axios = require("axios");
const { tokenModel } = require("../model/token.model");
exports.tokenController = async (req, res) => {
  const { code, shop, hmac, state } = req.query;

  const queryParams = { ...req.query };
  delete queryParams.hmac;
  const message = new URLSearchParams(queryParams).toString();
  const generatedHmac = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(message)
    .digest("hex");

  if (generatedHmac !== hmac) {
    return res.status(400).send("HMAC validation failed");
  }

  try {
    // Exchange the code for an access token
    const response = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      },
    );

    const accessToken = response.data.access_token;
    await tokenModel.findOneAndUpdate(
      {}, // match any one document
      { token: accessToken }, // update token
      { new: true, upsert: true },
    );

    res.send("Token saved or updated successfully");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Error exchanging code for access token");
  }
};
