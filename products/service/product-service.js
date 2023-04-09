const { BadRequest } = require("../../middleware/errors");
const { ProductRepository } = require("../repository/product-repository");

class ProductService {
    constructor() {
        this.repository = new ProductRepository();
    }

    async createProduct(payload) {
        const {
            productName,
            description,
            banner,
            type,
            availableUnits,
            unitPrice,
            available,
            supplier,
        } = payload;

        if (!productName) {
            throw new BadRequest("Product name is required");
        }

        if (!type) {
            throw new BadRequest("Product type is required");
        }

        if (!availableUnits) {
            throw new BadRequest("Available product units is required");
        }

        if (!unitPrice) {
            throw new BadRequest("Unit price is required");
        }

        const createProduct = await this.repository.createProduct({
            ...payload,
        });

        return {
            success: true,
            data: createProduct,
        };
    }
}

module.exports = { ProductService };
