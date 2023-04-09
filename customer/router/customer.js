const express = require("express");
const { StatusCodes } = require("http-status-codes");
// const {
//     // findCustomerById,
//     findCustomerByEmail,
//     // findCustomerByIdWithWishlist,
//     getCartItem,
//     getCustomerOrders,
// } = require("../controller/customer");
const { CustomerService } = require("../service/customer-service");
const customerRouter = express.Router();

const customerService = new CustomerService();

customerRouter.get("/get-customer/:id", async (req, res, next) => {
    try {
        const customer = await customerService.getCustomerById(req.params.id);
        return res.status(StatusCodes.OK).json(customer);
    } catch (error) {
        next(error);
    }
});
// customerRouter.get("/email/:email", findCustomerByEmail);
// customerRouter.get("/get-cart-item", getCartItem);
// customerRouter.get("/customer-orders", getCustomerOrders);
// customerRouter.get("/wishlist/:customerId", findCustomerByIdWithWishlist);

module.exports = { customerRouter };
