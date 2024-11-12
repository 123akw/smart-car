import { Sequelize } from 'sequelize';
import process from 'process';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 定义数据库名称常量
const dbName = 'parking_system_db';
async function inquiryProcess() {
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
    return answerList;
}
/**
 * 异步函数，用于创建和写入数据库配置文件
 */
async function createAndWriteDbConfigFile() {
    let answerList = [];
    const readResult = syncReadConfig();
    // 如果数据库配置文件不存在，则进行用户交互
    if (readResult) {
        //数据库配置文件存在，直接读取
        console.log('\x1b[36m%s\x1b[0m', 'A dbConfig.json file is detected under the root file,\nand the interrogation phase is skipped');
        answerList = [readResult.username, readResult.password, readResult.host, readResult.port];
    } else {
        console.log('\x1b[36m%s\x1b[0m', 'An inquiry process will be conducted');
        //进行询问流程
        answerList = await inquiryProcess();
        // 同步写入配置文件
        syncWriteConfig(answerList);
        // 创建数据库连接实例并创建数据库
    }
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
        console.log('\x1b[36m%s\x1b[0m', `Database ${dbName} created successfully`);
    } catch (e) {
        console.error('unable create database: ', e);

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
    // 构建数据库配置JSON字符串\
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
        console.log('\x1b[36m%s\x1b[0m', 'The configuration has been written to a json file, please check the dbConfig.json file in the root directory');
    } catch (e) {
        console.error('Failed to write to file', e);
        throw e;
    }
}
/**
 * 同步读取数据库配置文件
 * 
 * 此函数尝试从文件系统中读取名为'dbConfig.json'的文件，并将其内容解析为JSON对象
 * 如果文件存在且能成功解析，则返回解析后的配置对象；如果文件不存在或解析失败，则返回null
 * 
 * @returns {Object | null} 返回解析后的数据库配置对象，或者在失败时返回null
 */
function syncReadConfig() {
    // 获取当前文件路径
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // 定义配置文件路径
    //C:\Users\15613\Desktop\code\A-parking-backend\backend\dbConfig.json

    const filePath = path.join(__dirname, '../dbConfig.json');
    try {
        if (fs.existsSync(filePath)) {
            const dbConfigJson = fs.readFileSync(filePath, 'utf-8');
            try {
                return JSON.parse(dbConfigJson);
            } catch (parseError) {
                console.error('Failed to parse dbConfig json\n', parseError);
                return null;
            }
        }
        else {
            console.error('dbConfig json is not find');
            return null;
        }
    } catch (e) {
        console.error('An error occurred while reading the file \n', e);
        return null;
    }
}
// 导出函数以供外部调用
export { createAndWriteDbConfigFile };
