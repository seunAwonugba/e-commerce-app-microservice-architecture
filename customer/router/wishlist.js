const express = require("express");
const { createWishlist } = require("../controller/wishlist");
const wishlistRouter = express.Router();

wishlistRouter.post("/create-wishlist", createWishlist);

module.exports = { wishlistRouter };
