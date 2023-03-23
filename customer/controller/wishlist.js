const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { BadRequest } = require("../errors");
const { wishlist, customer } = require("../models");

const createWishlist = async (req, res, next) => {
    const { name, price } = req.body;

    if (!name) {
        return next(new BadRequest("Kindly provide item name"));
    }

    if (!price) {
        return next(new BadRequest("Kindly provide item price"));
    }

    try {
        const createWishlist = await wishlist.create({
            ...req.body,
            customerId: req.user.userId,
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            data: createWishlist,
        });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

const getCustomerWishList = async (req, res, next) => {
    const customerId = req.user.userId;

    try {
        const customerWishlist = await customer.findByPk(customerId, {
            include: [
                {
                    model: wishlist,
                },
            ],
        });

        if (!customerWishlist) {
            return next(new BadRequest("Customer does not exist"));
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            data: customerWishlist,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: error,
        });
    }
};

module.exports = { createWishlist, getCustomerWishList };
