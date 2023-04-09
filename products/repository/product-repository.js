const { product } = require("../models");

class ProductRepository {
    async createProduct({
        productName,
        description,
        banner,
        type,
        availableUnits,
        unitPrice,
        available,
        supplier,
    }) {
        const data = {
            productName,
            description,
            banner,
            type,
            availableUnits,
            unitPrice,
            available,
            supplier,
        };
        const createProduct = await product.create({ ...data });

        return createProduct;
    }
}

module.exports = { ProductRepository };
