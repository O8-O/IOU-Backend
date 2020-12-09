'use strict';
module.exports = (sequelize, DataTypes) => {
    const images = sequelize.define('images', {
        imageNum: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        parentImage: {
            type: DataTypes.INTEGER
        },
        data: {
            type: DataTypes.TEXT
        },
        lightColor: {
            type: DataTypes.STRING
        }
    });
    return images;
};