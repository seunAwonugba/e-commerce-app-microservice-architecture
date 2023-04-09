const express = require("express");
// const {
//     addProductToWishlist,
//     getCustomerWishlistProducts,
// } = require("../controller/wishlist");
const wishlistRouter = express.Router();

// wishlistRouter.post("/create-wishlist", addProductToWishlist);
// wishlistRouter.get("/wishlist", getCustomerWishlistProducts);

module.exports = { wishlistRouter };
