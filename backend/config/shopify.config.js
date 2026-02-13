require("dotenv").config();
const { shopifyApi, ApiVersion } = require("@shopify/shopify-api");
const {
  NodeHttpClient,
} = require("@shopify/shopify-api/dist/cjs/runtime/node");
const { envVariables } = require("./env.config");

const shopify = shopifyApi({
  apiKey: envVariables.shopify.shopifyApiKey,
  apiSecretKey: envVariables.shopify.shopifyApiSecret,
  scopes: ["write_products, read_products"],
  hostName: envVariables.shopify.host.replace(/https?:\/\//, ""), // ngrok URL without https://
  apiVersion: ApiVersion.July25,
  isEmbeddedApp: false,
  runtime: { httpClient: NodeHttpClient },
});

module.exports = { shopify };
