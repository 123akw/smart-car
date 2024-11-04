import { AuthService } from '../services/authService.js';

const authInstance = new AuthService();
async function register(req, res, next) {
    try {
        const { username, telephone, password } = req.body;
        const result = await authInstance.register(username, password, telephone);
        if (!result) {
            return res.status(400).json({
                code: 0,
                message: 'failed',
            });
        } else {
            res.status(201).json({
                code: 1,
                message: 'success',
                username: result.username,
            });
        }
    } catch (error) {
        next(error);
    }

}

async function login(req, res, next) {
    try {
        const { username, telephone, password } = req.body;
        let userToken = null;
        if (username) {
            userToken = await authInstance.login(username, null, password);
        } else {
            userToken = await authInstance.login(null, telephone, password);
        }
        if (!userToken) {
            return res.status(404).json({
                code: 0,
                message: 'failed',
            });
        }
        return res.status(200).json({
            code: 1,
            message: 'success',
            token: userToken,
        });
    } catch (error) {
        next(error);
    }
}

export { register, login };