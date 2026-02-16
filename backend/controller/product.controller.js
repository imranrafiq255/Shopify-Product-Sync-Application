const { envVariables } = require("../config/env.config.js");
const productModel = require("../model/product.model.js");
const { getShopifyProducts } = require("../util/fetch-products.util.js");
const axios = require("axios");
exports.getAllProductsFromShopify = async (req, res) => {
  try {
    const data = await getShopifyProducts();
    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messaage: error.message,
    });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    let status = req.query.status || "";
    const skip = (page - 1) * limit;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { handle: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
        { "variants.sku": { $regex: search, $options: "i" } },
      ];
    }
    if (status && status !== "all") {
      query.status = status.toUpperCase();
    }

    const totalProducts = await productModel.countDocuments(query);

    const products = await productModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, body_html, vendor, product_type } = req.body;
    const shop = envVariables.shopify.shopDomain;
    const accessToken = envVariables.shopify.shopifyAccessToken;

    // 1️⃣ Create product on Shopify
    const response = await axios.post(
      `https://${shop}/admin/api/2026-01/products.json`,
      {
        product: {
          title,
          body_html,
          vendor,
          product_type,
        },
      },
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      },
    );

    const shopifyProduct = response.data.product;

    return res.status(201).json({
      success: true,
      product: shopifyProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { title, body_html, vendor, product_type } = req.body;

    const shop = envVariables.shopify.shopDomain;
    const accessToken = envVariables.shopify.shopifyAccessToken;
    const gid = req.query.id;

    const numericId = gid.split("/").pop();
    await axios.put(
      `https://${shop}/admin/api/2026-01/products/${numericId}.json`,
      {
        product: {
          id: numericId,
          title,
          body_html,
          vendor,
          product_type,
        },
      },
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      },
    );

    return res.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const shopifyProductId = req.query.id;

    const shop = envVariables.shopify.shopDomain;
    const accessToken = envVariables.shopify.shopifyAccessToken;

    const numericId = shopifyProductId.split("/").pop();
    await axios.delete(
      `https://${shop}/admin/api/2026-01/products/${numericId}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
        },
      },
    );
    return res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
