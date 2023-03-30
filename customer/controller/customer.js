const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { BadRequest } = require("../errors");
const { customer, address, cart, product, orders } = require("../models");

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

        if (!findCustomerById) {
            return next(new BadRequest("Customer does not exist"));
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            data: findCustomerById,
        });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

const findCustomerByEmail = async (req, res, next) => {
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

const findCustomerByIdWithWishlist = async (req, res, next) => {
    const { customerId } = req.params;

    try {
        const findCustomerById = await customer.findByPk(customerId, {
            include: [
                {
                    model: wishlist,
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

const getCartItem = async (req, res, next) => {
    try {
        const getCartItem = await customer.findByPk(req.user.userId, {
            include: [
                {
                    model: cart,
                    include: [
                        {
                            model: product,
                        },
                    ],
                },
            ],
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            data: getCartItem,
        });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

const getCustomerOrders = async (req, res, next) => {
    try {
        const getCustomerOrders = await customer.findByPk(req.user.userId, {
            include: [
                {
                    model: orders,
                    include: [
                        {
                            model: product,
                        },
                    ],
                },
            ],
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            data: getCustomerOrders,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

module.exports = {
    findCustomerById,
    findCustomerByEmail,
    // findCustomerByIdWithWishlist,
    getCartItem,
    getCustomerOrders,
};
