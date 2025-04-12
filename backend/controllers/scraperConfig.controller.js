const ScraperConfig = require("../models/ScraperConfig");

exports.createScraperConfig = async (req, res) => {
  try {
    const config = new ScraperConfig(req.body);
    const saved = await config.save();

    return res.status(201).json(saved);
  } catch (err) {
    console.error("[POST /scraper-config] Error:", err);

    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", errors: err.errors });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllScraperConfigs = async (req, res) => {
  try {
    const configs = await ScraperConfig.find();
    return res.status(200).json(configs);
  } catch (err) {
    console.error("[GET /scraper-config] Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
