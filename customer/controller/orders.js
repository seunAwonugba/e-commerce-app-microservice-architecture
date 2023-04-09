// const { StatusCodes, ReasonPhrases } = require("http-status-codes");
// const { Sequelize } = require("sequelize");
// const { BadRequest } = require("../errors");
// const { cart, product, customer, orders } = require("../models");

// const createOrder = async (req, res, next) => {
//     //get products in customer cart
//     try {
//         const getProductsInCart = await customer.findByPk(req.user.userId, {
//             include: [
//                 {
//                     model: cart,
//                     include: [
//                         {
//                             model: product,
//                         },
//                     ],
//                 },
//             ],
//         });

//         //if no cart return , you cant order without a cart
//         if (!getProductsInCart) {
//             return next(new BadRequest("User has no product in cart"));
//         }

//         //if product create new order

//         //get total price of products in cart
//         const totalProductsPriceInCart = getProductsInCart.cart.products.reduce(
//             (sum, product) => sum + product.price,
//             0
//         );

//         //get productIdsInCart
//         const productsInCart = getProductsInCart.cart.products.map(
//             (product) => product.id
//         );

//         // create new order
//         const createNewOrder = await orders.create({
//             amount: totalProductsPriceInCart,
//             customerId: req.user.userId,
//         });

//         console.log(createNewOrder);

//         //find all products in carts in product
//         const allProductsInCart = await product.findAll({
//             where: {
//                 id: {
//                     [Sequelize.Op.in]: productsInCart,
//                 },
//             },
//         });

//         //Finally, update the cartId and orderId fields on each product in the cart using a loop and the update method on the product model.
//         //and the orderId is set to the ID of the new order to associate the product with the order.
//         for (let i = 0; i < allProductsInCart.length; i++) {
//             const product = allProductsInCart[i];
//             await product.update(
//                 {
//                     orderId: createNewOrder.id,
//                 },
//                 {
//                     where: {
//                         id: {
//                             [Sequelize.Op.in]: productsInCart,
//                         },
//                     },
//                 }
//             );
//         }

//         return res.status(StatusCodes.OK).json({
//             success: true,
//             data: createNewOrder,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             data: ReasonPhrases.INTERNAL_SERVER_ERROR,
//         });
//     }
// };

// module.exports = { createOrder };
