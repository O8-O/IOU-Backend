'use strict';
module.exports = (sequelize, DataTypes) => {
    const preferences = sequelize.define('preferences', {
        ID: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true
        },
        image: {
            type: DataTypes.TEXT
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
        }
    });
    return preferences;
};