import {DataTypes, Sequelize} from 'sequelize';
import {readAndParseJsonFileSync} from '../../database/readConfig.js';
import {asyncModel} from '../tablesInitializer.js';

const {databaseName, username, password, host,} = readAndParseJsonFileSync('./dbConfig.json');

async function initOrdersTable() {
    const sequelize = new Sequelize(databaseName, username, password, {
        host: host,
        dialect: 'mysql',
        logging: false
    });
    try {
        //测试数据库有无成功连接
        await sequelize.authenticate();
        console.log('\x1b[36m%s\x1b[0m', 'database is connected');
    } catch (e) {
        console.error('database is not connected', e);
    }
    const Orders = sequelize.define('orders', {
        order_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
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
    await asyncModel(Orders);
    await sequelize.close();
}

//异步调用表达式
(async () => {
    await initOrdersTable();
})();

