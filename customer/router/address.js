const express = require("express");
const { createAddress } = require("../controller/address");
const addressRouter = express.Router();

addressRouter.post("/create-address", createAddress);

module.exports = { addressRouter };
