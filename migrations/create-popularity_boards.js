'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('popularity_boards', {
            postNum: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            contentText: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            contentImage: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            writer: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            views: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            recommend: {
                type: Sequelize.INTEGER,
                allowNull: false
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
        return queryInterface.dropTable('popularity_boards');
    }
};