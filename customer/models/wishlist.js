"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Wishlist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Wishlist.belongsTo(models.customer);
        }
    }
    Wishlist.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Item name is required",
                    },
                },
            },
            description: DataTypes.STRING,
            banner: DataTypes.STRING,
            available: { type: DataTypes.BOOLEAN, defaultValue: true },
            price: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        msg: "Item price is required",
                    },
                },
            },
            customerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: "wishlists",
            modelName: "wishlist",
        }
    );
    return Wishlist;
};
