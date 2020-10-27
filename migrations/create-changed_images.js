'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('changed_images', {
            imageNum: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            user: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            parentImage: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            image: {
                type: Sequelize.STRING,
                allowNull: false
            },
            roomType: {
                type: Sequelize.STRING
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
            lightPosition: {
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
        return queryInterface.dropTable('changed_images');
    }
};