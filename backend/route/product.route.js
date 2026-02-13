const express = require("express");
const {
  getAllProductsFromShopify,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");
const { isAdminAuthenticated } = require("../middleware/admin.middleware");

const router = express.Router();

router.get(
  "/get-all-shopify-products",
  isAdminAuthenticated,
  getAllProductsFromShopify,
);
router.get("/get-all-products", isAdminAuthenticated, getAllProducts);
router.post("/create-product", isAdminAuthenticated, createProduct);
router.put("/update-product", isAdminAuthenticated, updateProduct);
router.delete("/delete-product", isAdminAuthenticated, deleteProduct);
module.exports = router;
