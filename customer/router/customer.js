const express = require("express");
const { findCustomerById } = require("../controller/customer");
const customerRouter = express.Router();

customerRouter.get("/:id", findCustomerById);

module.exports = { customerRouter };
