'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('vote_boards', {
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
            contentImage1: {
                type: Sequelize.STRING
            },
            contentImage2: {
                type: Sequelize.STRING
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
        return queryInterface.dropTable('vote_boards');
    }
};