const express = require("express");
const bodyParser = require("body-parser");
const scrapeProducts = require("./scraper");
const scraperConfigRoutes = require("./routes/scraperConfig.routes");

require("./mongo");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", scrapeProducts);
app.use("/api", scraperConfigRoutes);

server = app.listen(port, () => console.log("Server running on port 5000"));

module.exports = server;
