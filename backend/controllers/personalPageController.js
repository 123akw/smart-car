import parseToken from '../utility/parseToken.js';

import personalPageService from '../services/PersonalPageService.js';

const personalPageInstance = new personalPageService();

//GET方法
async function getProfile(req, res, next) {
    try {
        const authHeader = req.headers.Authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const payload = parseToken(token);
        if (payload) {
            const result = await personalPageInstance.getProfile(token);
            // 内部查询失败
            if (result === null) {
                return res.status(500).json({
                    code: -1,
                    message: 'Internal Server Error'
                });
            }
            // 未找到对应的ID数据
            else if (result === -1) {
                return res.status(404).json({
                    code: 0,
                    message: 'Not Found'
                });
            }
            // 查询成功并返回数据
            // eslint-disable-next-line no-unused-vars
            const { user_id, password, ...safeObject } = result;
            return res.status(200).json({
                code: 1,
                data: safeObject
            });
        }// token解析失败(原因可能是参数错误或者时效性失效) 
        else if (payload === null) {
            return res.status(401).json({
                code: 0,
                message: 'Unauthorized'
            });
        }
    } catch (e) {
        next(e);
    }
}
async function getVehicles(req, res, next) {
    try {
        const authHeader = req.headers.Authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const payload = parseToken(token);
    } catch (e) {
        next(e);
    }
}