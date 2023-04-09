// "use strict";
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//     async up(queryInterface, Sequelize) {
//         await queryInterface.createTable("carts", {
//             id: {
//                 allowNull: false,
//                 autoIncrement: true,
//                 primaryKey: true,
//                 type: Sequelize.INTEGER,
//             },
//             unit: {
//                 type: Sequelize.INTEGER,
//             },
//             customerId: {
//                 type: Sequelize.INTEGER,
//                 allowNull: false,
//                 unique: true,
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
//         await queryInterface.dropTable("carts");
//     },
// };
