const express = require("express");
const { createCustomer, login } = require("../controller/auth");

const authRouter = express.Router();

authRouter.post("/create-customer", createCustomer);
authRouter.post("/login", login);

module.exports = { authRouter };
