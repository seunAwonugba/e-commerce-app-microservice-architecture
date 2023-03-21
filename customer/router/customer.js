const express = require("express");
const {
    findCustomerById,
    findCustomerByEmail,
} = require("../controller/customer");
const customerRouter = express.Router();

customerRouter.get("/:id", findCustomerById);
customerRouter.get("/email/:email", findCustomerByEmail);

module.exports = { customerRouter };
