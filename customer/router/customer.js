const express = require("express");
const {
    findCustomerById,
    findCustomerByEmail,
    findCustomerByIdWithWishlist,
} = require("../controller/customer");
const customerRouter = express.Router();

customerRouter.get("/get-customer/:id", findCustomerById);
customerRouter.get("/email/:email", findCustomerByEmail);
// customerRouter.get("/wishlist/:customerId", findCustomerByIdWithWishlist);

module.exports = { customerRouter };
