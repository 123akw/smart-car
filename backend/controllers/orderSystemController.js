import orderSystemService from '../services/orderSystemService.js';

const orderSystemInstance = new orderSystemService();

//POST方法
async function addOrder(req, res, next) {
    try {
        const payload = req.payload;
        const result = await orderSystemInstance.addOrder(payload);
        if (result === false) {
            return res.status(500).json({
                code: -1,
                message: 'Internal Server Error'
            });
        } else if (result) {
            return res.status(201).json({
                code: 1,
                message: 'success'
            });
        }
    } catch (e) {
        next(e);
    }
}

//POST方法
async function deleteOrder(req, res, next) {
    try {
        const payload = req.payload;
        const {orderId} = req.body;
        const result = await orderSystemInstance.deleteOrder(payload, orderId);
        if (result === null) {
            return res.status(500).json({
                code: -1,
                message: 'Internal Server Error'
            });
        } else if (result === 1 || result === 0)
            return res.status(200).json({
                code: 1,
                message: 'success'
            });
    } catch (e) {
        next(e);
    }
}

//GET方法
async function getOrdersHistory(req, res, next) {
    try {
        const payload = req.payload;
        const result = await orderSystemInstance.getOrdersHistory(payload);
        if (result === null) {
            return res.status(500).json({
                code: -1,
                message: 'Internal Server Error'
            });
        } else if (result === -1) {
            return res.status(404).json({
                code: 0,
                message: 'Not Found'
            });
        }
        // eslint-disable-next-line no-unused-vars
        const {user_id, password, createdAt, ...safeObject} = result.dataValues;
        return res.status(200).json({
            code: 1,
            data: safeObject
        });
    } catch (e) {
        next(e);
    }
}


//POST方法
async function updatePayState(req, res, next) {
    try {
        const payload = req.payload;
        const {orderId, payState} = req.body;
        const result = await orderSystemInstance.updatePayState(payload, orderId, payState);
        if (result === null) {
            return res.status(500).json({
                code: -1,
                message: 'Internal Server Error'
            });
        } else if (result === 1 || result === 0)
            return res.status(200).json({
                code: 1,
                message: 'success'
            });
    } catch (e) {
        next(e);
    }
}

export {addOrder, deleteOrder, getOrdersHistory, updatePayState};