import { DataTypes } from 'sequelize';

import { dbConnection } from '../DBInstance';

const Vehicles = dbConnection.define('vehicles', {
    //大整数类型、不允许为空、唯一、自增主键
    vehicle_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    //大整型类型、不允许为空、唯一
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
    },
    //字符串类型、不允许为空、不唯一
    vehicle_type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    //字符串类型、不允许为空、不唯一
    vehicle_number:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
});

export {Vehicles};