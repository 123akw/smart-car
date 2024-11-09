import { AuthService } from '../services/authService.js';

const authInstance = new AuthService();
async function register(req, res, next) {
    try {
        const { username, telephone, password } = req.body;
        const result = await authInstance.register(username, password, telephone);
        // -1:账号已经存在
        if (result === -1) {
            return res.status(409).json({
                code: 0,
                message: 'failed',
            });
        } else if (result === 1) {
            // 1:注册成功
            res.status(201).json({
                code: 1,
                message: 'success',
                username: result.username,
            });
        } else if (result === null) {
            // null:注册失败
            return res.status(500).json({
                code: -1,
                message: 'error:Register operation failed',
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
        // -1:账号不存在 或者账号密码错误
        if (userToken === -1) {
            return res.status(404).json({
                code: 0,
                message: 'failed',
            });
        } else if (userToken === null) {
            // null:登录失败
            return res.status(500).json({
                code: -1,
                message: 'error:Login operation failed',
            });
        }
        // 1:登录成功
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