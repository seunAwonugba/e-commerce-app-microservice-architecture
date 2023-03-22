const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { BadRequest } = require("../errors");
const { wishlist } = require("../models");

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

module.exports = { createWishlist };
