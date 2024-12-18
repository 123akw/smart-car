import personalPageService from '../services/PersonalPageService.js';

const personalPageInstance = new personalPageService();

//POST方法
async function addVehicle(req, res, next) {
    try {
        const payload = req.payload;
        const result = await personalPageInstance.addVehicle(payload, req.body);
        if (!result) {
            return res.status(500).json({
                code: -1,
                message: 'Internal Server Error'
            });
        }
        else if (result)
            return res.status(201).json({
                code: 1,
                message: 'success'
            });
    } catch (e) {
        next(e);
    }
}
//POST方法
async function deleteVehicle(req, res, next) {
    try {
        const payload = req.payload;
        const { vehicleId } = req.body;
        const result = await personalPageInstance.deleteVehicles(payload, vehicleId);
        if (result === null) {
            return res.status(500).json({
                code: -1,
                message: 'Internal Server Error'
            });
        }
        else if (result === 1 || result === 0)
            return res.status(200).json({
                code: 1,
                message: 'success'
            });
    } catch (e) {
        next(e);
    }
}
//GET方法
async function getProfile(req, res, next) {
    try {
        const payload = req.payload;
        const result = await personalPageInstance.getProfile(payload);
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
        const { user_id, password, createdAt, ...safeObject } = result.dataValues;
        return res.status(200).json({
            code: 1,
            data: safeObject
        });

    } catch (e) {
        next(e);
    }
}
//GET方法
async function getVehicles(req, res, next) {
    try {
        const payload = req.payload;
        const result = await personalPageInstance.getVehicles(payload);

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

        const vehiclesArray = [];
        for (let vehicleMessages of result) {
            // eslint-disable-next-line no-unused-vars
            const { user_id, createdAt, ...safeObject } = vehicleMessages.dataValues;
            vehiclesArray.push(safeObject);
        }

        return res.status(200).json({
            code: 1,
            data: vehiclesArray
        });
    }
    catch (e) {
        next(e);
    }
}

//POST方法
async function updateProfile(req, res, next) {
    try {
        const payload = req.payload;
        const { updateData } = req.body;
        const result = await personalPageInstance.updateProfile(payload, updateData);
        if (result === null) {
            return res.status(500).json({
                code: -1,
                message: 'Internal Server Error'
            });
        }
        else if (result === 1 || result === 0)
            return res.status(200).json({
                code: 1,
                message: 'success'
            });
    } catch (e) {
        next(e);
    }
}
//POST方法
async function updateVehicle(req, res, next) {
    try {
        const payload = req.payload;
        const { vehicleId, updateData: updateData } = req.body;
        const result = await personalPageInstance.updateVehicles(payload, vehicleId, updateData);
        if (result === null) {
            return res.status(500).json({
                code: -1,
                message: 'Internal Server Error'
            });
        }
        else if (result === 1 || result === 0)
            return res.status(200).json({
                code: 1,
                message: 'success'
            });
    } catch (e) {
        next(e);
    }

}

export { addVehicle, deleteVehicle, getProfile, getVehicles, updateProfile, updateVehicle };