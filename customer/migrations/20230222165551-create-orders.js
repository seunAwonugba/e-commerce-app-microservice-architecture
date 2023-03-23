"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            amount: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.ENUM(
                    "NEW",
                    "PAYMENT_RECEIVED",
                    "PAYMENT_FAILED",
                    "PROCESSING",
                    "DELIVERED",
                    "CANCELED"
                ),
            },
            date: {
                type: Sequelize.DATE,
            },
            customerId: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("orders");
    },
};
