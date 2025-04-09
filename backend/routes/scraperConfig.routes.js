const express = require("express");
const router = express.Router();
const {
  createScraperConfig,
} = require("../controllers/scraperConfig.controller");

router.post("/scraper-config", createScraperConfig);

module.exports = router;
