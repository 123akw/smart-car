import { Sequelize } from 'sequelize';

import { readAndParseJsonFileSync } from './readConfig.js';


const { databaseName, username, password, host, } = readAndParseJsonFileSync();


const dbConnection = new Sequelize(databaseName, username, password, { host: host, dialect: 'mysql',logging:false });

dbConnection.authenticate().then(() => console.log('Connection has been established successfully'))
    .catch(err => console.error('Unable to connect to the database:', err));

    
export { dbConnection };