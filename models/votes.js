'use strict';
module.exports = (sequelize, DataTypes) => {
    const votes = sequelize.define('votes', {
        voteNum: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        postNum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        choice: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return votes;
};