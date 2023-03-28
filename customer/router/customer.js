const express = require("express");
const {
    findCustomerById,
    findCustomerByEmail,
    findCustomerByIdWithWishlist,
    getCartItem,
} = require("../controller/customer");
const customerRouter = express.Router();

customerRouter.get("/get-customer/:id", findCustomerById);
customerRouter.get("/email/:email", findCustomerByEmail);
customerRouter.get("/get-cart-item", getCartItem);
// customerRouter.get("/wishlist/:customerId", findCustomerByIdWithWishlist);

module.exports = { customerRouter };
