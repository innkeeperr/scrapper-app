const express = require("express");
const bodyParser = require("body-parser");
const scrapeProducts = require("./scraper");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: ".env.local" });

const app = express();
const port = 3000;

const uri = process.env.MONGODB_URI;

// MongoDB connection
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware for routes
app.use("/", scrapeProducts);

server = app.listen(port, () => console.log("Server running on port 5000"));

// Export server for testing
module.exports = server;
