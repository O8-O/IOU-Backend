'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('comments', {
            commentNum: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            postType: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            postNum: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            writer: {
                type: Sequelize.STRING(20),
                allowNull: false
            }
            // ,
            // parent: {
            //     type: Sequelize.INTEGER,
            //     allowNull: true
            // }
            ,
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
        return queryInterface.dropTable('comments');
    }
};