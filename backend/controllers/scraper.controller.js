const ProductConfig = require("../models/ProductConfig");
const cheerio = require("cheerio");
const axios = require("axios");

const getValueFromElement = ($, element, fieldConfig) => {
  const selectedElement = $(element).find(fieldConfig.selector).first();

  if (!selectedElement.length) {
    console.warn(`Element not found for selector: ${fieldConfig}`);
    return "";
  }

  if (fieldConfig.attribute === "text") {
    return selectedElement.text().trim();
  } else {
    return selectedElement.attr(fieldConfig.attribute);
  }
};

const collectData = ($, scraperConfig) => {
  const title = getValueFromElement($, $.root(), scraperConfig.title);
  const price = getValueFromElement($, $.root(), scraperConfig.price);
  const link = scraperConfig.link.selector
    ? getValueFromElement($, $.root(), scraperConfig.link)
    : "";

  return { title, price, link };
};

exports.scrapeProduct = async (req, res) => {
  try {
    const { productConfigId } = req.body;

    const productConfig = await ProductConfig.findById(productConfigId)
      .populate("scraperConfigId")
      .exec();

    if (
      !productConfig.searchUrl.includes(productConfig.scraperConfigId.baseUrl)
    ) {
      console.error("Invalid URL");
      return;
    }

    const response = await axios.get(productConfig.searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
      },
    });
    const $ = cheerio.load(response.data);

    const { title, price, link } = collectData(
      $,
      productConfig.scraperConfigId
    );

    console.log({ title, price, link });
    return res.status(201).json({ title, price, link });
  } catch (err) {
    console.error("[POST /scraper] Error:", err);

    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", errors: err.errors });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
