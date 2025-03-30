const express = require("express");
const bodyParser = require("body-parser");
const scrapeProducts = require("./scraper");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware for routes
app.use("/", scrapeProducts);

server = app.listen(port, () => console.log("Server running on port 5000"));

// Export server for testing
module.exports = server;
