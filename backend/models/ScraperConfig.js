const mongoose = require("mongoose");

const scraperConfigSchema = new mongoose.Schema(
  {
    baseUrl: { type: String, required: true },
    itemList: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    priceFraction: { type: String },
    link: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ScraperConfig", scraperConfigSchema);
