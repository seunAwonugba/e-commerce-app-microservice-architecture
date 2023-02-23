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
            Cart.belongsTo(models.Customer);
            Cart.hasMany(models.Product, {
                foreignKey: {
                    name: "cartId",
                },
            });
        }
    }
    Cart.init(
        {
            product: DataTypes.ARRAY(DataTypes.STRING),
            unit: DataTypes.STRING,
            customerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Cart",
        }
    );
    return Cart;
};
