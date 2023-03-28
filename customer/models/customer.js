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
            Customer.hasOne(models.address, {
                foreignKey: {
                    name: "customerId",
                },
                onDelete: "CASCADE",
            });

            Customer.hasOne(models.cart, {
                foreignKey: {
                    name: "customerId",
                },
                onDelete: "CASCADE",
            });

            Customer.hasMany(models.wishlist, {
                foreignKey: {
                    name: "customerId",
                },
                onDelete: "CASCADE",
            });

            Customer.hasMany(models.orders, {
                foreignKey: {
                    name: "customerId",
                },
                onDelete: "CASCADE",
            });

            Customer.hasMany(models.product, {
                foreignKey: {
                    name: "customerId",
                },
                onDelete: "CASCADE",
            });
        }

        toJSON() {
            return { ...this.get(), password: undefined };
        }
    }
    Customer.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "First name is required",
                    },
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Last name is required",
                    },
                },
            },
            userName: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                unique: {
                    args: true,
                    msg: "Email address already exist",
                },
                validate: {
                    isEmail: {
                        msg: "Please provide a valid email address",
                    },
                    notEmpty: {
                        msg: "Email address is required",
                    },
                },
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Password is required",
                    },
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Phone number is required",
                    },
                },
            },
        },
        {
            sequelize,
            tableName: "customers",
            modelName: "customer",
        }
    );

    Customer.beforeCreate(async (customer) => {
        customer.password = await bcrypt.hash(customer.password, 10);
    });

    return Customer;
};
