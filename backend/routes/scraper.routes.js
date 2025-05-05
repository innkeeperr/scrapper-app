const express = require("express");
const router = express.Router();
const {
  scrapeProduct,
  testScraperConfiguration,
} = require("../controllers/scraper.controller");

router.post("/scraper", scrapeProduct);
router.post("/test-scraper-config", testScraperConfiguration);

module.exports = router;
