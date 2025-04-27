const express = require("express");
const bodyParser = require("body-parser");
const scraperConfigRoutes = require("./routes/scraperConfig.routes");
const productConfigRoutes = require("./routes/productConfig.routes");
const scraperRoutes = require("./routes/scraper.routes");
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

app.use("/api", scraperRoutes);
app.use("/api", scraperConfigRoutes);
app.use("/api", productConfigRoutes);

server = app.listen(port, () => console.log("Server running on port 3000"));

module.exports = server;
