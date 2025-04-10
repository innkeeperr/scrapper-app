const express = require("express");
const bodyParser = require("body-parser");
const scrapeProducts = require("./scraper");
const scraperConfigRoutes = require("./routes/scraperConfig.routes");
const cors = require("cors");
require("./mongo");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", scrapeProducts);
app.use("/api", scraperConfigRoutes);

server = app.listen(port, () => console.log("Server running on port 3000"));

module.exports = server;
