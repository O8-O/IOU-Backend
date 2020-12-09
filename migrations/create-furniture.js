'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('furnitures', {
            furnitureNum: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            user: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            furniture: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            parentImage: {
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable('furnitures');
    }
};