const express = require("express");
const router = express.Router();
const {
  createProductConfig,
  getAllProductConfigs,
} = require("../controllers/productConfig.controller");

router.post("/product-config", createProductConfig);
router.get("/product-config", getAllProductConfigs);

module.exports = router;
