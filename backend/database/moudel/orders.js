import {DataTypes} from 'sequelize';

import {dbConnection} from '../DBInstance.js';

const Orders = dbConnection.define('orders', {
    order_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    user_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    },
    vehicle_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    park_time: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    park_money: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    park_place: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    pay_state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    }
});

export default Orders;