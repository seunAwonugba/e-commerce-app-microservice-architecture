"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Product.init(
        {
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Product name is required",
                    },
                },
            },
            description: DataTypes.STRING,
            banner: DataTypes.STRING,
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Product type is required",
                    },
                },
            },
            availableUnits: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Available product units is required",
                    },
                },
            },
            unitPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Product unit price is required",
                    },
                },
            },
            available: {
                type: DataTypes.ENUM("YES", "NO"),
                defaultValue: "YES",
            },
            supplier: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: "products",
            modelName: "product",
        }
    );
    return Product;
};
