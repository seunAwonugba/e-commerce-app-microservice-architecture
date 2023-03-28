"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Cart.belongsTo(models.customer);
            Cart.hasMany(models.product, {
                foreignKey: {
                    name: "cartId",
                },
                onDelete: "CASCADE",
            });
        }
    }
    Cart.init(
        {
            unit: DataTypes.INTEGER,
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: {
                    args: true,
                    msg: "Cart set already, update cart instead",
                },
            },
        },
        {
            sequelize,
            tableName: "carts",
            modelName: "cart",
        }
    );
    return Cart;
};
