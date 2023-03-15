"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Address.belongsTo(models.customer);
        }
    }
    Address.init(
        {
            street: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Street cannot be empty",
                    },
                },
            },
            postalCode: DataTypes.STRING,
            city: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Street cannot be empty",
                    },
                },
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Country cannot be empty",
                    },
                },
            },
            houseNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "House number cannot be empty",
                    },
                },
            },
            customerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: "addresses",
            modelName: "address",
        }
    );
    return Address;
};
