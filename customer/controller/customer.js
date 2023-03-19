const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { BadRequest } = require("../errors");
const { customer, address } = require("../models");

const findCustomerById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const findCustomerById = await customer.findByPk(id, {
            include: [
                {
                    model: address,
                },
            ],
        });

        if (!customer) {
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

module.exports = { findCustomerById };
