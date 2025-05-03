const mongoose = require("mongoose");

const createFieldSchema = ({ required }) => ({
  selector: { type: String, required },
  attribute: { type: String, required, default: "text" },
});

const scraperConfigSchema = new mongoose.Schema(
  {
    baseUrl: { type: String, required: true },
    title: createFieldSchema({ required: true }),
    price: createFieldSchema({ required: true }),
    link: createFieldSchema({ required: false }),
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ScraperConfig", scraperConfigSchema);
