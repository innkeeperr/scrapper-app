const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
