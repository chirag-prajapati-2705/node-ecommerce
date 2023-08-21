const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

var productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: "This field is required",
  },
  product_description: {
    type: String,
  },
  product_slug: {
    type: String,
    required: "This field is required",
  },
  status: {
    type: Boolean,
    default: 1,
  },
  price: {
    type: String,
    required: "This field is required",
  },
  quantity: {
    type: String,
    required: "This field is required",
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  created_date: {
    type: Date,
    default: Date.now, // Date in one week from now
  },
  updated_date: {
    type: Date,
    default: Date.now, // Date in one week from now
  },
});

module.exports = mongoose.model("Product", productSchema);
