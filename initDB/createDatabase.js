import { Sequelize } from 'sequelize';
import process from 'process';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 定义数据库名称常量
const dbName = 'parking_system_db';

/**
 * 异步函数，用于创建和写入数据库配置文件
 */
async function createAndWriteDbConfigFile() {
    // 创建读取控制台输入的接口
    const inputStream = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // 定义需要询问用户的问题列表
    const askQuestionList = [
        'Please enter a username:',
        'Please enter your password:',
        'Please enter your database address (localhost by default):',
        'Please enter your database port (default is 3306):'
    ];

    // 存储用户回答的数组
    const answerList = [];
    /**
    * 异步提问函数，返回用户的回答
    * @param {string} question - 提问的问题
    * @returns {Promise<string>} - 用户的回答
    */
    const asyncQuestion = (question) => {
        return new Promise((resolve) => {
            inputStream.question(question, (answer) => {
                resolve(answer);
            });
        });
    };
    /**
     * 验证用户输入并递归提问
     * @param {number} index - 当前问题的索引
     */
    const vaildInput = async (index) => {
        if (index < askQuestionList.length) {
            let answer = await asyncQuestion(askQuestionList[index]);
            let isValid = true;
            // 根据问题索引验证用户输入
            switch (index) {
                case 0: if (answer === '') {
                    console.error('The username cannot be empty');
                    isValid = false;

                }
                    break;
                case 1: if (answer === '') {
                    console.error('The password cannot be empty');
                    isValid = false;
                }
                    break;
                case 2: if (answer === '') {
                    console.warn('The adress will be set the default value(localhost)');
                    answer = 'localhost';
                }
                    break;
                case 3: if (answer === '') {
                    console.warn('The port will be set the default value(3306)');
                    answer = '3306';
                }
                    break;
            }
            // 如果输入有效，则继续下一个问题
            if (isValid) {
                answerList.push(answer);
                await vaildInput(index + 1);
            } else {
                // 如果输入无效，重新提问当前问题
                await vaildInput(index);
                //console.log(answerList);
            }
        } else {
            // 所有问题回答完毕，关闭输入流
            inputStream.close();
        }

    };
    // 从第一个问题开始提问
    await vaildInput(0);
    // 同步写入配置文件
    syncWriteConfig(answerList);
    // 创建数据库连接实例并创建数据库
    await createDatabase(new Sequelize(`mysql://${answerList[0]}:${answerList[1]}@${answerList[2]}:${answerList[3]}`));
}
/**
 * 异步函数，用于创建数据库
 * @param {Sequelize} connectInstance - 数据库连接实例
 */
async function createDatabase(connectInstance) {
    try {
        // 执行创建数据库的SQL语句
        await connectInstance.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`Database ${dbName} created successfully`);
    } catch (e) {
        console.log('unable create database: ', e);

    }
    finally {
        // 关闭数据库连接
        await connectInstance.close();
    }
}
/**
 * 同步函数，用于写入数据库配置文件
 * @param {Array} answers - 用户的回答数组
 */
function syncWriteConfig(answers) {
    // 获取当前文件路径
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // 定义配置文件路径
    const filePath = path.join(__dirname, '../dbConfig.json');
    // 构建数据库配置JSON字符串
    const dbConfigJson = JSON.stringify({
        databaseName: dbName,
        connectionString: `mysql://${answers[0]}:${answers[1]}@${answers[2]}:${answers[3]}`,
        username: answers[0],
        password: answers[1],
        host: answers[2],
        port: answers[3]
    }, null, 2);
    try {
        // 同步写入配置文件
        fs.writeFileSync(filePath, dbConfigJson);
        console.log('The configuration has been written to a json file, please check the dbConfig.json file in the root directory');
    } catch (e) {
        console.error('Failed to write to file', e);
        throw e;
    }
}
// 导出函数以供外部调用
export { createAndWriteDbConfigFile };
