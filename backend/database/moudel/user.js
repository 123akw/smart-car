import { DataTypes } from 'sequelize';

import { dbConnection } from '../DBInstance.js';


const User = dbConnection.define('user', {
    //大整数类型，不允许为空，且唯一，主键自增
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    //字符串类型，不允许为空，且唯一
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    //字符串类型，不允许为空，不唯一
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    //字符串类型，允许为空，不唯一
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    //字符串类型，不允许为空，不唯一
    telephone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    //字符串类型，允许为空，不唯一
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
});
export default User;
