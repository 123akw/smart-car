import isDataObject from '../utility/isDataObject.js';
import { Sequelize } from 'sequelize';
import readline from 'readline';
import process from 'process';

/**
 * 定义一个用于数据库操作的查询类
 */
class Querier {
    /**
     * Querier 类的构造函数
     * @param {Object} moudelInstance - 数据库模型实例
     */
    constructor(moudelInstance) {
        this.moudelInstance = moudelInstance;
    }
    /**
     * 插入单条记录
     * @param {Object} dataObject - 要插入的数据对象
     * @param {Object} [option={}] - 可选的插入选项
     * @returns {Promise<Object>} 插入成功的数据对象
     */
    async insertQuery(dataObject, option = {}) {
        return await this.moudelInstance.create(dataObject, option);
    }
    /**
     * 批量插入多条记录
     * @param {Array<Object>} dataArray - 要插入的数据数组
     * @param {boolean} [validator=true] - 是否进行数据验证
     * @returns {Promise<Array<Object>>} 插入成功的数据数组
     */
    async batchInsertQuery(dataArray, validator = true) {
        try {
            return await this.moudelInstance.bulkCreate(dataArray, { validate: validator });
        } catch (e) {
            if (e instanceof Sequelize.ValidationError) {
                console.error('Data inserted in bulk does not comply with data constraints');
            } else {
                console.error('An error occurred while inserting data\n', e);
            }
            throw e;
        }
    }
    /**
    * 查询所有记录
    * @param {Object} [option={}] - 可选的查询选项
    * @returns {Promise<Array<Object>>} 查询结果数组
    */
    async selectQuery(option = {}) {
        const selectArray = await this.moudelInstance.findAll(option);
        if (selectArray.every(user => user.dataValues)) {
            console.log('The model data is filtered');
            return selectArray;
        }
        else {
            console.error('An error occurred while filtering');
            return [];
        }
    }
    /**
     * 根据条件查询记录
     * @param {Object} whereArgsObject - 查询条件对象
     * @returns {Promise<Array<Object>>} 查询结果数组
     */
    async selectWhere(whereArgsObject) {
        try {
            if (isDataObject(whereArgsObject)) {
                const selectArray = await this.moudelInstance.findAll({ where: whereArgsObject });
                return selectArray;
            } else {
                throw Error('The entered parameters is not valid');
            }
        } catch (e) {
            console.error('An error occurred while filtering the data\n');
            console.error('error mssage:', e);
            throw e;
        }
    }
    /**
    * 按顺序查询记录
    * @param {Array<Array<string|number>>} orderArgsArray - 排序条件数组
    * @returns {Promise<Array<Object>>} 查询结果数组
    */
    async selectOrder(orderArgsArray) {
        if (isDataObject(orderArgsArray)) {
            const selectArray = await this.moudelInstance.findAll({ order: orderArgsArray });
            return selectArray;
        } else {
            console.error('The entered parameters is not valid');
            return [];
        }
    }
    /**
     * 分页查询记录
     * @param {number} limit - 每页记录数
     * @param {number} offset - 偏移量
     * @returns {Promise<Array<Object>>} 查询结果数组
     */
    async selectLimAndOff(limit, offset) {
        try {
            const selectArray = await this.moudelInstance.findAll({ limit: limit, offset: offset });
            return selectArray;
        } catch (e) {
            console.error('An error occurred while filtering the data\n', e);
            throw e;
        }
    }
    /**
     * 更新记录
     * @param {Object} updataDataObject - 要更新的数据对象
     * @param {Object} whereArgsObject - 更新条件对象
     * @returns {Promise<boolean>} 更新是否成功
     */
    async updataQuery(updataDataObject, whereArgsObject) {
        const [affectedRows] = await this.moudelInstance.update(updataDataObject, { where: whereArgsObject });
        if (affectedRows === 0) {
            console.warn('No record was updated');
            return false;
        } else {
            console.log(`${affectedRows} pieces of data were successfully updated`);
            return true;
        }
    }
    /**
    * 删除记录
    * @param {Object} whereArgsObject - 删除条件对象
    * @returns {Promise<boolean>} 删除是否成功
    */
    async deleteQuery(whereArgsObject) {
        const deletRows = await this.moudelInstance.destroy({ where: whereArgsObject });
        if (deletRows > 0) {
            console.log(`There were ${deletRows} records deleted`);
            return true;
        }
        console.warn('No record was deleted');
        return false;
    }
    /**
    * 清空表
    * @returns {Promise<void>}
    */
    async truncateQuery() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('This is a dangerous operation that cannot be recovered after deletion,\nso whether or not to proceed(Y/N)', async (answer) => {
            answer = answer.toLowerCase();
            if (answer === 'y') {
                try {
                    await this.moudelInstance.destroy({ truncate: true });
                    console.log('The moudel has deleted');
                } catch (e) {
                    console.error('The operation failed\n', e);
                }
            } else if (answer === 'n') {
                console.warn('The operation is cancelled');
            }
        });
        rl.close();
    }
}

export default Querier;

