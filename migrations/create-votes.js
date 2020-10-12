'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('votes', {
            voteNum: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            postNum: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            user: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            choice: {
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
        return queryInterface.dropTable('votes');
    }
};