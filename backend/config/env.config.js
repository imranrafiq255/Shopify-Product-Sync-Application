require("dotenv").config();

const envVariables = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  shopify: {
    shopifyApiKey: process.env.SHOPIFY_API_KEY,
    shopifyApiSecret: process.env.SHOPIFY_API_SECRET,
    host: process.env.host,
    shopDomain: process.env.SHOP_DOMAIN,
    shopifyAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  },
  adminTokenSecretKey: process.env.ADMIN_TOKEN_SECRET_KEY,
};

module.exports = { envVariables };
