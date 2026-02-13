const productModel = require("../model/product.model.js");
exports.createProductWebhook = async (req, res) => {
  try {
    const product = req.body;
    await productModel.updateOne(
      { shopifyProductId: "gid://shopify/Product/" + product.id },
      {
        shopifyProductId: "gid://shopify/Product/" + product.id,
        title: product.title,
        handle: product.handle,
        descriptionHtml: product.body_html,
        tags: product.tags ? product.tags.split(",") : [],
        images: product.images?.map((img) => ({
          src: img.src,
          altText: img.alt || "",
        })),
        variants: product.variants?.map((variant) => ({
          shopifyVariantId: variant.id,
          title: variant.title,
          price: parseFloat(variant.price),
          sku: variant.sku,
          availableForSale: variant.inventory_quantity > 0,
        })),
      },
      { upsert: true, new: true },
    );
    console.log("Webhook received");
    return res.status(200).send("Webhook received");
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(500).send("Server error");
  }
};
exports.deleteProductWebhook = async (req, res) => {
  try {
    let shopifyProductId = req.body.id;
    shopifyProductId = shopifyProductId
      ? "gid://shopify/Product/" + shopifyProductId
      : "";
    await productModel.deleteOne({
      shopifyProductId: shopifyProductId,
    });
    console.log(
      "Product with id of " + shopifyProductId + " is deleted successfully.",
    );
    return res.json({
      success: true,
      message:
        "Product with id of " + shopifyProductId + " is deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateProductWebhook = async (req, res) => {
  try {
    const product = req.body;

    await productModel.findOneAndUpdate(
      { shopifyProductId: "gid://shopify/Product/" + product.id.toString() },
      {
        title: product.title,
        descriptionHtml: product.body_html,
        tags: product.tags ? product.tags.split(",").map((t) => t.trim()) : [],
      },
      { upsert: true, new: true },
    );

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
};
