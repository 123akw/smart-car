//封装认证类
import jwt from 'jsonwebtoken';
import Querier from '../database/querier.js';
import User from '../database/moudel/user.js';

class AuthService {
    constructor() {
        this.userQuerier = new Querier(User);
    }
    async register(username = null, password = null, telephone = null) {
        try {
            if (username === null || password === null || telephone === null) {
                throw new Error('The parameters are not out of specification');
            }
            const resultArray = await this.userQuerier.selectWhere({ username: username, telephone: telephone });
            //当返回进来的为数组且为空时，表明查询不到此账号
            if (Array.isArray(resultArray) && resultArray.length === 0) {
                await this.userQuerier.insertQuery({ username, password, telephone });
                console.log('The account has been created');
                return 1;
                //当返回进来的为数组且为空时，表明存在此账号
            } else if (Array.isArray(resultArray) && resultArray.length === 1) {
                console.warn('The account has existed');
                return -1;
            }
        } catch (e) {
            console.error('The register operation failed\n', e);
            return null;
        }

    }
    async login(username = null, telephone = null, password = null) {
        if (!password || (!username && !telephone)) {
            throw new Error('The parameters are not out of specification');
        }
        try {
            const whereArgsObject = await this.parametersValidate(username, password, telephone);
            const user = await this.userQuerier.selectWhere(whereArgsObject);
            if (Array.isArray(user) && user.length === 0) {
                console.warn('The username or password is wrong');
                return -1;
            } else if (Array.isArray(user) && user.length === 1) {
                console.log('The login operation success');
                return await this.setToken(user[0].get('user_id'));
            }
        } catch (e) {
            console.error('The login operation failed\n', e);
            return null;
        }
    }
    async setToken(userId) {
        const payload = {
            user_id: userId,
        };
        const token = jwt.sign(payload, 'HELLOWORLD', { expiresIn: '1h' });
        return token;
    }
    async parametersValidate(username, password, telephone) {
        if (username !== null && telephone == null) {
            return { username: username, password: password };
        } else if (username == null && telephone !== null) {
            return { telephone: telephone, password: password };
        }
        return { username: username, password: password };
    }
}

export { AuthService };