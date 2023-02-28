"use strict";
const { Model } = require("sequelize");
const validator = require("validator");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Customer.hasOne(models.Address, {
                foreignKey: {
                    name: "customerId",
                },
                onDelete: "CASCADE",
            });

            Customer.hasOne(models.Cart, {
                foreignKey: {
                    name: "customerId",
                },
                onDelete: "CASCADE",
            });

            Customer.hasMany(models.Wishlist, {
                foreignKey: {
                    name: "customerId",
                },
                onDelete: "CASCADE",
            });

            Customer.hasMany(models.Orders, {
                foreignKey: {
                    name: "customerId",
                },
                onDelete: "CASCADE",
            });
        }
    }
    Customer.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                // validate: [validator.default.isEmpty, "Name is required"],
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: {
                        msg: "Please provide a valid email address",
                    },
                },
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                // validate: [
                //     validator.default.isStrongPassword,
                //     "Password minimum length must be 8, must contain 1 lowercase,  must contain 1 uppercase, must contain 1 number, and must contain 1 symbol ",
                // ],
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
            },
            address: DataTypes.ARRAY(DataTypes.STRING),
            cart: DataTypes.ARRAY(DataTypes.STRING),
            wishlist: DataTypes.ARRAY(DataTypes.STRING),
            orders: DataTypes.ARRAY(DataTypes.STRING),
        },
        {
            sequelize,
            modelName: "Customer",
        }
    );

    Customer.beforeCreate(async (customer) => {
        customer.password = await bcrypt.hash(customer.password, 10);
    });

    return Customer;
};

// Customer.beforeCreate(async (customer) => {
//     customer.password = await bcrypt.hash(password, 10);
// });
