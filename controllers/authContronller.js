import { AuthService } from '../services/authService.js';


async function register(req, res, next) {
    try {
        const { username, password, telephone } = req.body;
        const result = await AuthService.register(username, password, telephone);
        if (!result) {
            return res.status(400).json({
                code: 0,
                message: 'failed',
            });
        } else {
            res.stauts(201).json({
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
        const { username, telephone, password, } = req.body;
        let userToken;
        if (username) {
            userToken = await AuthService.login(username, null, password);
        } else {
            userToken = await AuthService.login(null, telephone, password);
        }
        if (!userToken){
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