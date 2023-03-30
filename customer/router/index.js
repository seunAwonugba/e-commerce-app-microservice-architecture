const { addressRouter } = require("./address");
const { authRouter } = require("./auth");
const { customerRouter } = require("./customer");
const { productRouter } = require("./product");
const { wishlistRouter } = require("./wishlist");
const { cartRouter } = require("./cart");
const { ordersRouter } = require("./orders");

module.exports = {
    addressRouter,
    authRouter,
    customerRouter,
    productRouter,
    wishlistRouter,
    cartRouter,
    ordersRouter,
};
