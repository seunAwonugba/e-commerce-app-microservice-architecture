// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//     class Product extends Model {
//         /**
//          * Helper method for defining associations.
//          * This method is not a part of Sequelize lifecycle.
//          * The `models/index` file will call this method automatically.
//          */
//         static associate(models) {
//             // define association here
//             Product.belongsTo(models.cart);
//             Product.belongsTo(models.orders);
//             Product.belongsTo(models.wishlist);
//             Product.belongsTo(models.customer);
//         }
//     }
//     Product.init(
//         {
//             name: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: {
//                         msg: "Product name is required",
//                     },
//                 },
//             },
//             description: DataTypes.STRING,
//             banner: DataTypes.STRING,
//             type: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: {
//                         msg: "Product type is required",
//                     },
//                 },
//             },
//             unit: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: {
//                         msg: "Available product unit is required",
//                     },
//                 },
//             },
//             price: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: {
//                         msg: "Product price is required",
//                     },
//                 },
//             },
//             available: {
//                 type: DataTypes.ENUM("YES", "NO"),
//                 defaultValue: "YES",
//             },
//             supplier: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: {
//                         msg: "Supplier name is required",
//                     },
//                 },
//             },
//             cartId: {
//                 type: DataTypes.INTEGER,
//             },
//             orderId: {
//                 type: DataTypes.INTEGER,
//             },
//             wishlistId: {
//                 type: DataTypes.INTEGER,
//             },
//             customerId: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//             },
//         },
//         {
//             sequelize,
//             tableName: "products",
//             modelName: "product",
//         }
//     );
//     return Product;
// };
