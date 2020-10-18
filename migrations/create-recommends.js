'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('recommends', {
            recommendNum: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            postType:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            postNum: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            user: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            createdAt: {                
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('recommends');
    }
};