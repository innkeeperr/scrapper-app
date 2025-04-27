const express = require("express");
const router = express.Router();
const { scrapeProduct } = require("../controllers/scraper.controller");

router.post("/scraper", scrapeProduct);

module.exports = router;
