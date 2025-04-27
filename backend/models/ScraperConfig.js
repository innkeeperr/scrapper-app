const mongoose = require("mongoose");

const createFieldSchema = ({ required }) => ({
  selector: { type: String, required: true },
  attribute: { type: String, required: true, default: "text" },
});

const scraperConfigSchema = new mongoose.Schema(
  {
    baseUrl: { type: String, required: true },
    title: createFieldSchema({ required: true }),
    price: createFieldSchema({ required: true }),
    priceFraction: createFieldSchema({ required: false }),
    link: createFieldSchema({ required: true }),
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ScraperConfig", scraperConfigSchema);
