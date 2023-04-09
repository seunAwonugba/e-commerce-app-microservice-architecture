const express = require("express");
const { StatusCodes } = require("http-status-codes");
// const { createAddress } = require("../controller/address");
const { CustomerService } = require("../service/customer-service");
const addressRouter = express.Router();

const customerService = new CustomerService();
addressRouter.post("/create-address", async (req, res, next) => {
    try {
        const address = await customerService.createAddress(
            req.user.id,
            req.body
        );

        res.status(StatusCodes.CREATED).json(address);
    } catch (error) {
        next(error);
    }
});

module.exports = { addressRouter };
