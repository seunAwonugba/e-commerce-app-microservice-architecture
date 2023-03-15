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
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            banner: DataTypes.STRING,
            available: DataTypes.STRING,
            price: DataTypes.STRING,
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
