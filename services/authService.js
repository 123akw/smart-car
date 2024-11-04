//封装认证类
import jwt from 'jsonwebtoken';
import { Querier } from '../database/querier.js';
import { User } from '../database/User.js';

class AuthService {
    constructor() {
        this.userQuerier = new Querier(User());
    }
    async register(username = null, password = null, telephone = null) {
        try {
            if (username === null || password === null || telephone === null) {
                throw new Error('The parameters are not out of specification');
            }
            if (await this.userQuerier.selectWhere({ username: username, telephone: telephone }) === null) {
                const user = await this.userQuerier.insertQuery({ username, password, telephone });
                console.log('The account has been created');
                return user;
            } else {
                console.warn('The account has existed');
                return null;
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
        const whereArgsObject = this.parametersValidate(username, password, telephone);
        const user = await this.userQuerier.selectWhere(whereArgsObject);
        if (user === null) {
            console.warn('The username or password is wrong');
            return null;
        } else {
            return await this.setToken(user.id, user.username, user.email);
        }
    }
    async setToken(userId, username, telephone) {
        const payload = {
            id: userId,
            username: username,
            telephone: telephone
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

export {AuthService};