const ProductConfig = require("../models/ProductConfig");
const ScraperConfig = require("../models/ScraperConfig");
const mongoose = require("mongoose");

exports.createProductConfig = async (req, res) => {
  try {
    const { productName, maxPrice, scraperConfigId, searchUrl } = req.body;

    if (!productName || !scraperConfigId || !searchUrl) {
      return res
        .status(400)
        .json({ error: "All required data was not provided" });
    }

    if (!mongoose.Types.ObjectId.isValid(scraperConfigId)) {
      return res.status(400).json({ error: "Invalid ObjectId reference" });
    }

    const scraperConfig = await ScraperConfig.findById(scraperConfigId);

    if (!scraperConfig) {
      return res
        .status(400)
        .json({ error: "Provided scraperConfigId does not exist" });
    }

    const newProductConfig = new ProductConfig({
      productName,
      scraperConfigId,
      maxPrice,
      searchUrl,
    });

    await newProductConfig.save();
    res.status(201).json(newProductConfig);
  } catch (error) {
    console.error("Error while saving new ProductConfig", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllProductConfigs = async (req, res) => {
  try {
    const configs = await ProductConfig.find();
    return res.status(200).json(configs);
  } catch (err) {
    console.error("[GET /product-config] Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
