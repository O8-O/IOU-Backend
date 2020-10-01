'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            ID: {
                type: Sequelize.STRING(20),
                allowNull: false,
                primaryKey: true
            },
            PW: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            salt: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};