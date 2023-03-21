const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { BadRequest } = require("../errors");
const { customer, address } = require("../models");

exports.findCustomerById = async (req, res, next) => {
    const { id } = req.params;
    // console.log(req.params);

    try {
        const findCustomerById = await customer.findByPk(id, {
            include: [
                {
                    model: address,
                },
            ],
        });

        if (!findCustomerById) {
            return next(new BadRequest("Customer does not exist"));
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            data: findCustomerById,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

exports.findCustomerByEmail = async (req, res, next) => {
    const { email } = req.params;
    // console.log(`Email requested -> ${email}`);

    try {
        const findCustomerByEmail = await customer.findOne({
            where: { email },
            include: [
                {
                    model: address,
                },
            ],
        });

        // console.log(findCustomerByEmail);

        if (!findCustomerByEmail) {
            return next(
                new BadRequest("Customer with this email does not exist")
            );
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            data: findCustomerByEmail,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

// module.exports = { findCustomerById, findCustomerByEmail };
