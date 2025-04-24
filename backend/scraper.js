const cheerio = require("cheerio");
const axios = require("axios");
const router = require("express").Router();
const { generateTitle } = require("./utils");
const Product = require("./models/Product");
const ProductConfig = require("./models/ProductConfig");

router.post("/scrape", async (req, res) => {
  const { productConfigId } = req.body;

  const productConfig = await ProductConfig.findById(productConfigId)
    .populate("scraperConfigId")
    .exec();

  console.log("productConfig", productConfig);

  if (
    !productConfig.searchUrl.includes(productConfig.scraperConfigId.baseUrl)
  ) {
    console.error("Invalid URL");
    return;
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
      },
    });
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
    });
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({
      message: "Error scraping products",
      error: error.message,
    });
  }
});

module.exports = router;
