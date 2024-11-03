//封装认证类
import jwt from 'jsonwebtoken';
import { Querier } from '../database/querier.js';
import { User } from '../database/User.js';

class AuthService {
    constructor() {
        this.UserQuerier = new Querier(User());
    }
    async register(username, password, email) {
        const user=await this.UserQuerier.insertQuery({username, password, email});
        console.log('The register Operation is successful');
        return user;
    }
    async login(username, password) {
        const user = await this.UserQuerier
    }
}