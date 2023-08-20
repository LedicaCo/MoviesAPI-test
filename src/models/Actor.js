const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Actor = sequelize.define('actor', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});

module.exports = Actor; 