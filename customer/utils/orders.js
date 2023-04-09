// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//     class Orders extends Model {
//         /**
//          * Helper method for defining associations.
//          * This method is not a part of Sequelize lifecycle.
//          * The `models/index` file will call this method automatically.
//          */
//         static associate(models) {
//             // define association here
//             Orders.belongsTo(models.customer);
//             Orders.hasMany(models.product, {
//                 foreignKey: {
//                     name: "orderId",
//                 },
//                 onDelete: "CASCADE",
//             });
//         }
//     }
//     Orders.init(
//         {
//             amount: DataTypes.STRING,
//             status: {
//                 type: DataTypes.ENUM(
//                     "NEW",
//                     "PAYMENT_RECEIVED",
//                     "PAYMENT_FAILED",
//                     "PROCESSING",
//                     "DELIVERED",
//                     "CANCELED"
//                 ),
//                 defaultValue: "NEW",
//             },
//             date: DataTypes.DATE,
//             customerId: { type: DataTypes.INTEGER, allowNull: false },
//         },
//         {
//             sequelize,
//             tableName: "orders",
//             modelName: "orders",
//         }
//     );
//     return Orders;
// };
