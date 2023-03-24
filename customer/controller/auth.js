require("dotenv").config();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { customer } = require("../models");
const { BadRequest, Unauthenticated } = require("../errors/index");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const createCustomer = async (req, res, next) => {
    const { firstName, lastName, email, password, phone } = req.body;

    if (!firstName) {
        return next(new BadRequest("First name is required"));
    }

    if (!lastName) {
        return next(new BadRequest("Last name is required"));
    }

    if (!email) {
        return next(new BadRequest("Email address is required"));
    }

    if (!password) {
        return next(new BadRequest("Password is required"));
    }

    if (!phone) {
        return next(new BadRequest("Phone number is required"));
    }

    if (!validator.default.isStrongPassword(password)) {
        return next(
            new BadRequest(
                "Your password must include a minimum of 8 characters, at least one number, and a combination of uppercase and lowercase letters."
            )
        );
    }

    try {
        const createCustomer = await customer.create(req.body);
        // console.log(createCustomer);
        const name = `${createCustomer.firstName} ${createCustomer.lastName}`;

        const token = jwt.sign(
            {
                userId: createCustomer.id,
                name,
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
    } catch (error) {
        // console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: error.errors[0].message,
        });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return next(new BadRequest("Email address is required"));
    }

    if (!validator.default.isEmail(email)) {
        return next(new BadRequest("Please provide a valid email address"));
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

    try {
        const checkUser = await customer.findOne({
            where: { email },
        });

        if (!checkUser) {
            return next(
                new Unauthenticated(
                    "Login failed: Incorrect email address or password"
                )
            );
        }

        const comparePassword = await bcryptjs.compare(
            password,
            checkUser.password
        );

        if (!comparePassword) {
            return next(
                new Unauthenticated(
                    "Login failed: Incorrect email address or password"
                )
            );
        }

        const name = `${checkUser.firstName} ${checkUser.lastName}`;

        const token = jwt.sign(
            {
                userId: checkUser.id,
                name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );

        return res.status(StatusCodes.OK).json({
            success: true,
            data: checkUser,
            token,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: error.errors[0].message,
        });
    }
};

module.exports = { createCustomer, login };
