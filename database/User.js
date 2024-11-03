import { DataTypes } from 'sequelize';

import { dbConnection } from './sequelizeInstance.js';


const User = dbConnection.define('user', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
});
export { User };