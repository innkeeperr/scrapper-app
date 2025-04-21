const mongoose = require("mongoose");
const ScraperConfig = require("../models/ScraperConfig");
const { Schema } = mongoose;

const productConfigSchema = new mongoose.Schema(
  {
    searchUrl: { type: String, required: true },
    productName: { type: String, required: true },
    maxPrice: { type: Number },
    scraperConfigId: {
      type: Schema.Types.ObjectId,
      ref: ScraperConfig,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductConfig", productConfigSchema);
