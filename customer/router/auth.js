const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { CustomerService } = require("../service/customer-service");

const authRouter = express.Router();
const customerService = new CustomerService();

authRouter.post("/sign-up", async (req, res, next) => {
    try {
        const signUp = await customerService.signUp(req.body);
        res.status(StatusCodes.CREATED).json(signUp);
    } catch (error) {
        next(error);
    }
});

authRouter.post("/login", async (req, res, next) => {
    try {
        const login = await customerService.login(req.body);
        res.status(StatusCodes.CREATED).json(login);
    } catch (error) {
        next(error);
    }
});

module.exports = { authRouter };
