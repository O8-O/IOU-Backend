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
            area: {
                type: Sequelize.INTEGER
            },
            avgDistance: {
                type: Sequelize.INTEGER
            },
            cohesion: { 
                type: Sequelize.INTEGER
            },
            plant: {
                type: Sequelize.INTEGER
            },
            style: {
                type: Sequelize.STRING
            },
            roomColor: {
                type: Sequelize.STRING
            },
            lightColor: {
                type: Sequelize.STRING
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