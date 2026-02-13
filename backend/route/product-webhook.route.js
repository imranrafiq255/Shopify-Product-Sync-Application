const express = require("express");
const {
  createProductWebhook,
  deleteProductWebhook,
  updateProductWebhook,
} = require("../controller/product-webhook.controller");
const router = express.Router();
router.post("/create-product-webhook", createProductWebhook);
router.post("/delete-product-webhook", deleteProductWebhook);
router.post("/update-product-webhook", updateProductWebhook);
module.exports = router;
