'use strict';
module.exports = (sequelize, DataTypes) => {
    const furnitures = sequelize.define('furnitures', {
        furnitureNum: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        furniture: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        parentImage: {
            type: DataTypes.INTEGER
        }
    });
    return furnitures;
};