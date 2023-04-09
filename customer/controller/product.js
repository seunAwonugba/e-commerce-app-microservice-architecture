// const { BadRequest } = require("../errors");
// const { product } = require("../models");
// const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// const createProduct = async (req, res, next) => {
//     const { name, type, unit, price } = req.body;

//     if (!name) {
//         return next(new BadRequest("Product name is required"));
//     }

//     if (!type) {
//         return next(new BadRequest("Product type is required"));
//     }

//     if (!unit) {
//         return next(new BadRequest("Available product unit is required"));
//     }

//     if (!price) {
//         return next(new BadRequest("Product type is required"));
//     }

//     try {
//         const createProduct = await product.create({
//             ...req.body,
//             customerId: req.user.userId,
//         });

//         return res.status(StatusCodes.CREATED).json({
//             success: true,
//             data: createProduct,
//         });
//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             data: error.errors[0].message,
//         });
//     }
// };

// module.exports = { createProduct };
