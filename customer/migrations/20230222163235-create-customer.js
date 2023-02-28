"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Customers", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.CITEXT,
                allowNull: false,
            },
            email: {
                type: Sequelize.CITEXT,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            cart: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            wishlist: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            orders: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Customers");
    },
};
