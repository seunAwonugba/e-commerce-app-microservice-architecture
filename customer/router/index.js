const { addressRouter } = require("./address");
const { authRouter } = require("./auth");
const { customerRouter } = require("./customer");
const { productRouter } = require("./product");
const { wishlistRouter } = require("./wishlist");
const { cartRouter } = require("./cart");

module.exports = {
    addressRouter,
    authRouter,
    customerRouter,
    productRouter,
    wishlistRouter,
    cartRouter,
};
