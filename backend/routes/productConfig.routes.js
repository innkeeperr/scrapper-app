const express = require("express");
const router = express.Router();
const {
  createProductConfig,
} = require("../controllers/productConfig.controller");

router.post("/product-config", createProductConfig);

module.exports = router;
