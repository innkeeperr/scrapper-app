const cheerio = require("cheerio");
const axios = require("axios");
const router = require("express").Router();
const { generateFilename, saveProductJson, generateTitle } = require("./utils");
const Product = require("./models/Product");

const baseUrl = "https://www.amazon.pl";

router.post("/scrape", async (req, res) => {
  const { url } = req.body;
  if (!url.includes(baseUrl)) {
    console.error("Invalid URL");
    return;
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const products = [];
    $(".s-result-item").each((i, el) => {
      const product = $(el);
      const priceWhole = product.find(".a-price-whole").text();
      const priceFraction = product.find(".a-price-fraction").text();
      const price = priceWhole + priceFraction;
      const link = product.find(".a-link-normal.a-text-normal").attr("href");
      const title = generateTitle(product, link);

      if (title !== "" && price !== "" && link !== "") {
        products.push({ title, price, link });
      }
    });

    await Product.insertMany(products);

    res.json({
      products_saved: products.length,
      message: "Products scraped and saved to Mongo",
      filename: generateFilename(),
    });
  } catch (error) {
    console.error("Scraping error:", error);
    res.statusCode(500).json({
      message: "Error scraping products",
      error: error.message,
    });
  }
});

module.exports = router;
