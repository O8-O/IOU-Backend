'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('images', {
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
            image: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            parentImage: {
                type: Sequelize.INTEGER,
            },
            data: {
                type: Sequelize.TEXT
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
        return queryInterface.dropTable('images');
    }
};