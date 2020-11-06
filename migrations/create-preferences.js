'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('preferences', {
            ID: {
                type: Sequelize.STRING(20),
                allowNull: false,
                primaryKey: true
            },
            image: {
                type: Sequelize.TEXT
            },
            createdAt: {                
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('preferences');
    }
};