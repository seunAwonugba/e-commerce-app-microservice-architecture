const express = require("express");
const { addProductToCart } = require("../controller/cart");
const cartRouter = express.Router();

cartRouter.post("/add-to-cart", addProductToCart);

module.exports = { cartRouter };
