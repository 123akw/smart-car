import { isDataObject } from '../src/utility/isDataObject.js';
import { Sequelize } from 'sequelize';
import readline from 'readline';
import process from 'process';
class Querier {
    constructor(moudelInstance) {
        this.moudelInstance = moudelInstance;
    }
    async insertQuery(dataObject, option = {}) {
        return await this.moudelInstance.create(dataObject, option);
    }
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
    async selectWhere(whereArgsObject) {
        if (isDataObject(whereArgsObject)) {
            const selectArray = await this.moudelInstance.findAll({ where: whereArgsObject });
            return selectArray;
        } else {
            console.error('The entered parameters is not valid');
            return [];
        }
    }
    async selectOrder(orderArgsArray) {
        if (isDataObject(orderArgsArray)) {
            const selectArray = await this.moudelInstance.findAll({ order: orderArgsArray });
            return selectArray;
        } else {
            console.error('The entered parameters is not valid');
            return [];
        }
    }
    async selectLimAndOff(limit, offset) {
        try {
            const selectArray = await this.moudelInstance.findAll({ limit: limit, offset: offset });
            return selectArray;
        } catch (e) {
            console.error('An error occurred while filtering the data\n', e);
            throw e;
        }
    }
    async updataQuery(updataDataObject, whereArgsObject) {
        if (isDataObject(updataDataObject) && isDataObject(whereArgsObject)) {
            await this.moudelInstance.update(updataDataObject, { where: whereArgsObject });
            console.log('The data is updated');
            return true;
        }
        else {
            console.error('The entered parameters is not valid');
            return false;
        }
    }
    async deleteQuery(whereArgsObject) {
        if (isDataObject(whereArgsObject)) {
            await this.moudelInstance.destroy({ where: whereArgsObject });
            console.log('The data is deleted');
            return true;
        }
        else {
            console.error('The entered parameters is not valid');
            return false;
        }
    }
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

export { Querier };

