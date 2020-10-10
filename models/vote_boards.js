'use strict';
module.exports = (sequelize, DataTypes) => {
    const vote_boards = sequelize.define('vote_boards', {
        postNum: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        contentText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        contentImage1: {
            type: DataTypes.STRING
        },
        contentImage2: {
            type: DataTypes.STRING
        },
        writer: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        recommend: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return vote_boards;
};