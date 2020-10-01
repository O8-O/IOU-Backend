'use strict';
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        ID: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true
        },
        PW: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING
        }
    });
    return users;
};