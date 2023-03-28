const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { product, cart, customer } = require("../models");
const { BadRequest } = require("../errors");

const addProductToCart = async (req, res, next) => {
    const { productId, unit = 1 } = req.body;

    if (!productId) {
        return next(new BadRequest("Product id is required"));
    }

    try {
        const findProduct = await product.findByPk(productId);

        if (!findProduct) {
            return next(
                new BadRequest(
                    "Product not found: Product might have been deleted"
                )
            );
        }

        //check if user has cart
        const checkIfCustomerHasCart = await customer.findByPk(
            req.user.userId,
            {
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
            }
        );

        // If the customer doesn't have a cart, create one and update the product cartId

        if (checkIfCustomerHasCart.cart === null) {
            //create cart
            const createCart = await cart.create({
                customerId: req.user.userId,
                unit,
            });

            //update cartId in product model then save

            findProduct.cartId = createCart.id;

            await findProduct.save();

            return res.status(StatusCodes.CREATED).json({
                success: true,
                data: createCart,
            });
        }

        // If the customer has a cart, check if the product is already in the cart
        const existingProduct = checkIfCustomerHasCart.cart.products.find(
            (item) => {
                return item.id == productId;
            }
        );

        //if product exist in customer cart update cart unit
        if (existingProduct) {
            const increaseProductQuantity =
                await checkIfCustomerHasCart.cart.increment("unit", {
                    by: unit,
                });

            await increaseProductQuantity.save();

            return res.status(StatusCodes.CREATED).json({
                success: true,
                data: increaseProductQuantity,
            });
        }

        //if product is not existing
        if (!existingProduct) {
            const addNewProductToOldCart =
                checkIfCustomerHasCart.cart.addProduct(productId);

            console.log(addNewProductToOldCart);

            return res.status(StatusCodes.CREATED).json({
                success: true,
                data: addNewProductToOldCart,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

module.exports = { addProductToCart };
