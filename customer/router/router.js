const express = require("express");
const { createCustomer } = require("../controller/customer");

const router = express.Router();

router.post("/create-customer", createCustomer);

module.exports = { router };
