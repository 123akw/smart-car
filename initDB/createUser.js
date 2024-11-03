import { DataTypes, Sequelize } from 'sequelize';
import fs from 'fs';
import { createAndWriteDbConfigFile } from './createDatabase.js';
const { databaseName, username, password, host, } = readAndParseJsonFileSync();
//建表初始化
async function establishTable() {
    await createAndWriteDbConfigFile();
    const sequelize = new Sequelize(databaseName, username, password, {
        host: host,
        dialect: 'mysql',
        logging: false
    });
    try {
        await sequelize.authenticate();
        console.log('database is connected');
    } catch (e) {
        console.log('database is not connected', e);
    }
    const User = sequelize.define('user', {
        id:{
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey:true
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
    await syncModle(User, sequelize);

}



async function syncModle(SQLModel, connectInstance) {
    try {
        await SQLModel.sync();
        console.log('model is syncing successful');
    }
    catch (e) {
        console.log('model sync failed', e);
    }
    finally {
        connectInstance.close();
    }
}
function readAndParseJsonFileSync() {
    try {
        const jsonData = fs.readFileSync('dbConfig.json', 'utf8');
        const jsonContent = JSON.parse(jsonData);
        return jsonContent;
    } catch (e) {
        console.log('dbConfig json is not find \n', e);
    }
}
export { establishTable };