import {DataTypes, Sequelize} from 'sequelize';
import fs from 'fs';
import {createAndWriteDbConfigFile} from './dbConfigManager.js';


/**
 * 初始化数据库表
 *
 * 此函数负责根据数据库配置创建数据库连接，并定义一个用户表
 * 它首先确保数据库配置文件存在并正确，然后使用这些配置来创建数据库连接
 * 在成功连接数据库后，它定义了一个用户模型，并尝试同步该模型到数据库
 */
async function establishTable() {
    // 从数据库配置文件中读取并解析JSON数据
    await createAndWriteDbConfigFile();
    const {databaseName, username, password, host,} = readAndParseJsonFileSync();
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
    const User = sequelize.define('user', {
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
    const Vehicles = sequelize.define('vehicles', {
        vehicle_id: {
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
        vehicle_type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        vehicle_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    });
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

    await asyncModel(User);
    await asyncModel(Vehicles);
    await asyncModel(Orders);
    await sequelize.close();
}


/**
 * 同步模型到数据库
 *
 * @param {Object} SQLModel - Sequelize模型对象，表示要同步到数据库的模型
 * @param {Object} connectInstance - Sequelize连接实例，用于关闭数据库连接
 *
 * 此函数尝试将给定的模型同步到数据库在成功或失败时，都会相应地记录日志
 * 并在操作完成后关闭数据库连接
 */
async function asyncModel(SQLModel) {
    try {
        await SQLModel.sync();
        console.log('\x1b[36m%s\x1b[0m', `${SQLModel.getTableName()} model is syncing successful`);
    } catch (e) {
        console.error('model sync failed', e);
        throw e;
    }
}

/**
 * 读取并解析数据库配置文件
 *
 * 此函数尝试读取并解析名为'dbConfig.json'的数据库配置文件
 * 如果文件不存在或格式不正确，函数将抛出错误
 */
function readAndParseJsonFileSync() {
    try {
        const jsonData = fs.readFileSync('./dbConfig.json', 'utf8');
        const jsonContent = JSON.parse(jsonData);
        return jsonContent;
    } catch (e) {
        console.error('dbConfig json is not find \n', e);
        throw e;
    }
}

// 导出初始化表的函数，以便外部使用
export {establishTable, asyncModel};