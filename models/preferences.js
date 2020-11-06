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
        }
    });
    return preferences;
};