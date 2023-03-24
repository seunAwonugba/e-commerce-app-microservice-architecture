"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("wishlists", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            // name: {
            //     type: Sequelize.STRING,
            //     allowNull: false,
            // },
            // description: {
            //     type: Sequelize.STRING,
            // },
            // banner: {
            //     type: Sequelize.STRING,
            // },
            // available: {
            //     type: Sequelize.BOOLEAN,
            //     defaultValue: true,
            // },
            // price: {
            //     type: Sequelize.STRING,
            //     allowNull: false,
            //     validate: {
            //         notEmpty: {
            //             msg: "Item price is required",
            //         },
            //     },
            // },
            customerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        await queryInterface.dropTable("wishlists");
    },
};
