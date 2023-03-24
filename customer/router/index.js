const { addressRouter } = require("./address");
const { authRouter } = require("./auth");
const { customerRouter } = require("./customer");
const { productRouter } = require("./product");
const { wishlistRouter } = require("./wishlist");

module.exports = {
    addressRouter,
    authRouter,
    customerRouter,
    productRouter,
    wishlistRouter,
};
