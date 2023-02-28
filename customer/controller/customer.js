require("dotenv").config();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const db = require("../models");
const { BadRequest } = require("../errors/index");
const jwt = require("jsonwebtoken");

// console.log(process.env);

const createCustomer = async (req, res, next) => {
    const { name, email, password, phone } = req.body;

    if (!name) {
        return next(new BadRequest("Name is required"));
    }

    if (!email) {
        return next(new BadRequest("Email address is required"));
    }

    if (!password) {
        return next(new BadRequest("Password is required"));
    }

    // try {?
    // console.log(req.body);

    // const hashedPassword = await bcrypt.hash(password, 10);

    const { Customer } = db;
    // console.log(Customer);

    const createCustomer = await Customer.create(req.body);

    const token = jwt.sign(
        {
            userId: createCustomer.id,
            name: createCustomer.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    return res.status(StatusCodes.CREATED).json({
        success: true,
        data: createCustomer,
        token,
    });
    // } catch (error) {
    //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //         success: false,
    //         data: ReasonPhrases.INTERNAL_SERVER_ERROR,
    //     });
    // }
};

const createAddress = async (req, res) => {
    const {} = req.body;

    const { Address } = db;

    try {
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: error,
        });
    }
};

module.exports = { createCustomer };
