// const { StatusCodes, ReasonPhrases } = require("http-status-codes");
// const { BadRequest } = require("../errors");
// const { address } = require("../models");
// const createAddress = async (req, res, next) => {
//     const { street, postalCode, city, country, houseNumber } = req.body;
//     // console.log(req.user);

//     if (!street) {
//         return next(new BadRequest("State is required"));
//     }

//     if (!city) {
//         return next(new BadRequest("City is required"));
//     }

//     if (!country) {
//         return next(new BadRequest("Country is required"));
//     }

//     try {
//         const createAddress = await address.create({
//             street,
//             postalCode,
//             city,
//             country,
//             houseNumber,
//             customerId: req.user.userId,
//         });

//         return res.status(StatusCodes.CREATED).json({
//             success: true,
//             data: createAddress,
//         });
//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             data: error.errors[0].message,
//         });
//     }
// };

// module.exports = { createAddress };
