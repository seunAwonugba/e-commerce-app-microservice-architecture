// const { StatusCodes, ReasonPhrases } = require("http-status-codes");
// const { BadRequest } = require("../errors");
// const { wishlist, customer, product } = require("../models");

// const addProductToWishlist = async (req, res, next) => {
//     const { productId } = req.body;

//     if (!productId) {
//         return next(new BadRequest("Product id is required"));
//     }

//     try {
//         const findProduct = await product.findByPk(productId);

//         if (!findProduct) {
//             return next(
//                 new BadRequest(
//                     "Product not found: Product might have been deleted"
//                 )
//             );
//         }

//         const checkIfWishlistContainsProduct = await wishlist.findAll({
//             include: [
//                 {
//                     model: product,
//                     where: {
//                         id: findProduct.id,
//                     },
//                 },
//             ],
//             where: {
//                 customerId: req.user.userId,
//             },
//         });

//         if (checkIfWishlistContainsProduct.length != 0) {
//             return next(new BadRequest("Product already in customer wishlist"));
//         }

//         const addProductToWishlist = await wishlist.create({
//             customerId: req.user.userId,
//             include: [
//                 {
//                     model: product,
//                 },
//             ],
//         });

//         findProduct.wishlistId = addProductToWishlist.id;

//         await findProduct.save();

//         return res.status(StatusCodes.CREATED).json({
//             success: true,
//             data: addProductToWishlist,
//         });
//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             data: ReasonPhrases.INTERNAL_SERVER_ERROR,
//         });
//     }
// };

// const getCustomerWishlistProducts = async (req, res, next) => {
//     const customerId = req.user.userId;

//     try {
//         const customerWishlist = await customer.findByPk(customerId, {
//             include: [
//                 {
//                     model: wishlist,
//                     include: [
//                         {
//                             model: product,
//                         },
//                     ],
//                 },
//             ],
//         });

//         if (!customerWishlist) {
//             return next(new BadRequest("Customer does not exist"));
//         }

//         return res.status(StatusCodes.OK).json({
//             success: true,
//             data: customerWishlist,
//         });
//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             data: error,
//         });
//     }
// };

// module.exports = { addProductToWishlist, getCustomerWishlistProducts };
