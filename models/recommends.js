'use strict';
module.exports = (sequelize, DataTypes) => {
    const recommends = sequelize.define('recommends', {
        recommendNum: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        postType:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postNum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    });
    return recommends;
};