const axios = require("axios");
const { envVariables } = require("../config/env.config.js");
const { tokenModel } = require("../model/token.model.js");
const productModel = require("../model/product.model.js");
const SHOP_DOMAIN = envVariables.shopify.shopDomain;

const getShopifyProducts = async () => {
  try {
    const tokenDoc = await tokenModel.findOne({});
    if (!tokenDoc) {
      throw new Error("No token found in database");
    }

    const ACCESS_TOKEN = tokenDoc.token;

    const response = await axios({
      url: `https://${SHOP_DOMAIN}/admin/api/2026-01/graphql.json`,
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      data: {
        query: `{
          products(first: 250) {
            edges {
              node {
                id
                title
                handle
                status
                vendor
                productType
                descriptionHtml
                tags
                images(first: 5) {
                  edges {
                    node {
                      src
                      altText
                    }
                  }
                }
                variants(first: 100) {
                  edges {
                    node {
                      id
                      title
                      price
                      sku
                      availableForSale
                    }
                  }
                }
                metafields(first: 100) {
                  edges {
                    node {
                      id
                      namespace
                      key
                      value
                      type
                    }
                  }
                }
              }
            }
          }
        }`,
      },
    });

    if (!response.data || !response.data.data) {
      console.error("Shopify response missing data:", response.data);
      return [];
    }

    const products = response.data.data.products.edges.map((edge) => edge.node);

    const formattedProducts = [];

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const images = [];
      if (product.images && product.images.edges.length > 0) {
        for (let j = 0; j < product.images.edges.length; j++) {
          images.push({
            src: product.images.edges[j].node.src,
            altText: product.images.edges[j].node.altText,
          });
        }
      }

      const variants = [];
      if (product.variants && product.variants.edges.length > 0) {
        for (let j = 0; j < product.variants.edges.length; j++) {
          const v = product.variants.edges[j].node;
          variants.push({
            shopifyVariantId: v.id,
            title: v.title,
            status: v.status,
            price: parseFloat(v.price),
            sku: v.sku,
            availableForSale: v.availableForSale,
          });
        }
      }

      // ✅ Extract Metafields
      const metafields = [];
      if (product.metafields && product.metafields.edges.length > 0) {
        for (let j = 0; j < product.metafields.edges.length; j++) {
          const m = product.metafields.edges[j].node;
          metafields.push({
            shopifyMetafieldId: m.id,
            namespace: m.namespace,
            key: m.key,
            value: m.value,
            type: m.type,
          });
        }
      }

      // ✅ Tags already come as clean array
      const tags = product.tags || [];

      formattedProducts.push({
        shopifyProductId: product.id,
        title: product.title,
        handle: product.handle,
        descriptionHtml: product.descriptionHtml,
        status: product.status,
        productType: product.productType,
        vendor: product.vendor,
        tags: tags,
        images: images,
        variants: variants,
        metafields: metafields,
      });
    }

    // ✅ Upsert into DB
    for (let i = 0; i < formattedProducts.length; i++) {
      await productModel.updateOne(
        { shopifyProductId: formattedProducts[i].shopifyProductId },
        formattedProducts[i],
        { upsert: true },
      );
    }

    return formattedProducts;
  } catch (error) {
    console.error(
      "Error fetching Shopify products:",
      error.response?.data || error.message,
    );
    return [];
  }
};

module.exports = { getShopifyProducts };
