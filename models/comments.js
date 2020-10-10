'use strict';
module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define('comments', {
        commentNum: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        postNum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        writer: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
        // ,
        // parent: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // }
    });
    return comments;
};