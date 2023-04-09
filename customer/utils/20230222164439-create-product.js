// "use strict";
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//     async up(queryInterface, Sequelize) {
//         await queryInterface.createTable("products", {
//             id: {
//                 allowNull: false,
//                 autoIncrement: true,
//                 primaryKey: true,
//                 type: Sequelize.INTEGER,
//             },
//             name: {
//                 type: Sequelize.STRING,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: {
//                         msg: "Product name is required",
//                     },
//                 },
//             },
//             description: {
//                 type: Sequelize.STRING,
//             },
//             banner: {
//                 type: Sequelize.STRING,
//             },
//             type: {
//                 type: Sequelize.STRING,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: {
//                         msg: "Product type is required",
//                     },
//                 },
//             },
//             unit: {
//                 type: Sequelize.INTEGER,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: {
//                         msg: "Available product unit is required",
//                     },
//                 },
//             },
//             price: {
//                 type: Sequelize.INTEGER,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: {
//                         msg: "Product price is required",
//                     },
//                 },
//             },
//             available: {
//                 type: Sequelize.ENUM("YES", "NO"),
//                 defaultValue: "YES",
//             },
//             supplier: {
//                 type: Sequelize.STRING,
//                 allowNull: false,
//                 validate: {
//                     notEmpty: {
//                         msg: "Supplier's name is required",
//                     },
//                 },
//             },
//             cartId: {
//                 type: Sequelize.INTEGER,
//             },
//             orderId: {
//                 type: Sequelize.INTEGER,
//             },
//             wishlistId: {
//                 type: Sequelize.INTEGER,
//             },
//             customerId: {
//                 type: Sequelize.INTEGER,
//                 allowNull: false,
//             },
//             createdAt: {
//                 allowNull: false,
//                 type: Sequelize.DATE,
//             },
//             updatedAt: {
//                 allowNull: false,
//                 type: Sequelize.DATE,
//             },
//         });
//     },
//     async down(queryInterface, Sequelize) {
//         await queryInterface.dropTable("products");
//     },
// };
