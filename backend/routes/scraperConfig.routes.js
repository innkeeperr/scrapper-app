const express = require("express");
const router = express.Router();
const {
  createScraperConfig,
  getAllScraperConfigs,
} = require("../controllers/scraperConfig.controller");

router.post("/scraper-config", createScraperConfig);
router.get("/scraper-config", getAllScraperConfigs);

module.exports = router;
