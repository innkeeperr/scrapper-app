const getValueFromElement = ($, element, fieldConfig) => {
  const selectedElement = $(element).find(fieldConfig.selector);

  if (!selectedElement.length) {
    console.warn(`Element not found for selector: ${fieldConfig.selector}`);
    return "";
  }

  if (fieldConfig.attribute === "text") {
    return selectedElement.text().trim();
  } else {
    return selectedElement.attr(fieldConfig.attribute);
  }
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

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
      },
    });
    const $ = cheerio.load(response.data);

    const title = getValueFromElement(
      $,
      $.root(),
      productConfig.scraperConfigId.title
    );
    const price = getValueFromElement(
      $,
      $.root(),
      productConfig.scraperConfigId.price
    );
    const priceFraction = getValueFromElement(
      $,
      $.root(),
      productConfig.scraperConfigId.priceFraction
    );
    const link = getValueFromElement(
      $,
      $.root(),
      productConfig.scraperConfigId.link
    );

    console.log({ title, price, priceFraction, link });
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
