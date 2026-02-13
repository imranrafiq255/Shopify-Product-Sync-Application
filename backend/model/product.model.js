const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    shopifyVariantId: {
      type: String,
      required: true,
    },
    title: String,
    price: {
      type: String,
      required: true,
    },
    sku: String,
    availableForSale: Boolean,
  },
  { _id: false },
);

const imageSchema = new mongoose.Schema(
  {
    src: String,
    altText: String,
  },
  { _id: false },
);

const metafieldSchema = new mongoose.Schema(
  {
    namespace: String,
    key: String,
    value: String,
    type: String,
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    shopifyProductId: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    handle: String,

    descriptionHtml: String,

    tags: [String],

    images: [imageSchema],

    variants: [variantSchema],

    metafields: [metafieldSchema],

    syncedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
