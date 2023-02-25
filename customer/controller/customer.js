const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const db = require("../models");

const createCustomer = async (req, res) => {
    const { email, password, salt, phone } = req.body;

    const { Customer } = db;

    try {
        const createCustomer = await Customer.create({
            email,
            password,
            salt,
            phone,
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            data: createCustomer,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createCustomer };
