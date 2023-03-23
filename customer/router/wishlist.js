const express = require("express");
const {
    createWishlist,
    getCustomerWishList,
} = require("../controller/wishlist");
const wishlistRouter = express.Router();

wishlistRouter.post("/create-wishlist", createWishlist);
wishlistRouter.get("/wishlist", getCustomerWishList);

module.exports = { wishlistRouter };
