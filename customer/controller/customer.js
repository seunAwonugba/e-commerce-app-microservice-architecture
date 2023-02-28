require("dotenv").config();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const db = require("../models");
const { BadRequest } = require("../errors/index");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createCustomer = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name) {
            return next(new BadRequest("Name is required"));
        }

        if (!email) {
            return next(new BadRequest("Email address is required"));
        }

        if (!password) {
            return next(new BadRequest("Password is required"));
        }

        if (!validator.default.isStrongPassword(password)) {
            return next(
                new BadRequest(
                    "Your password must include a minimum of 8 characters, at least one number, and a combination of uppercase and lowercase letters."
                )
            );
        }

        const { Customer } = db;

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
            data: {
                id: createCustomer.dataValues.id,
                name: createCustomer.dataValues.name,
                email: createCustomer.dataValues.email,
                phone: createCustomer.dataValues.phone,
                updatedAt: createCustomer.dataValues.updatedAt,
                createdAt: createCustomer.dataValues.createdAt,
                address: createCustomer.dataValues.address,
                cart: createCustomer.dataValues.cart,
                wishlist: createCustomer.dataValues.wishlist,
                orders: createCustomer.dataValues.cart,
            },
            token,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: error.errors[0].message,
        });
    }
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
