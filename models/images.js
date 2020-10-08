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
            type: DataTypes.STRING,
            allowNull: false
        },
        roomType: {
            type: DataTypes.STRING
        },
        area: {
            type: DataTypes.INTEGER
        },
        avgDistance: {
            type: DataTypes.INTEGER
        },
        cohesion: {
            type: DataTypes.INTEGER
        },
        plant: {
            type: DataTypes.INTEGER
        },
        style: {
            type: DataTypes.STRING
        },
        roomColor: {
            type: DataTypes.STRING
        },
        lightColor: {
            type: DataTypes.STRING
        },
        lightPosition: {
            type: DataTypes.STRING
        }
    });
    return images;
};