import parseToken from '../utility/parseToken.js';
import Querier from '../database/querier.js';
import Vehicles from '../database/moudel/vehicles.js';
import User from '../database/moudel/user.js';

class personalPageService {
    constructor() {
        this.vehiclesModel = new Querier(Vehicles);
        this.UesrModel = new Querier(User);
    }
    async addVehicle(payload, data) {
        const userId = payload.user_id;
        data.user_id = userId;
        try {
            await this.vehiclesModel.insertQuery(data);
            console.log('\x1b[36m%s\x1b[0m', 'The add vehicle operation success');
            return true;
        } catch (e) {
            console.error('The add vehicle operation failed\n', e);
            return false;
        }
    }
    async deleteVehicles(payload, vehiclesId) {
        const userId = payload.user_id;
        try {
            const resultArray = await this.vehiclesModel.deleteQuery({ user_id: userId, vehicle_id: vehiclesId });
            if (resultArray > 0) {
                return 1;
            }
            else if (resultArray === 0) {
                return 0;
            }
        }
        catch (e) {
            console.error('The delete operation failed\n', e);
            return null;
        }
    }
    async getProfile(payload) {
        const userId = payload.user_id;
        try {
            const user = await this.UesrModel.selectWhere({ user_id: userId });
            if (Array.isArray(user) & user.length === 0) {
                console.error('Not found based on the user_id');
                return -1;
            } else if (Array.isArray(user) && user.length === 1)
                return user[0];
        } catch (e) {
            console.error('The get profile operation failed\n', e);
            return null;
        }
    }
    async getVehicles(payload) {
        const userId = payload.user_id;
        try {
            const vehicles = await this.vehiclesModel.selectWhere({ user_id: userId });
            if (Array.isArray(vehicles) & vehicles.length === 0) {
                console.error('Not found based on the user_id');
                return -1;
            } else if (Array.isArray(vehicles) && vehicles.length > 0)
                return vehicles;
        } catch (e) {
            console.error('The get vehicles operation failed\n', e);
            return null;
        }
    }
    async updataProfile(payload, updataData) {
        const userId = payload.user_id;
        try {
            const resultArray = await this.UesrModel.updataQuery(updataData, { user_id: userId });
            if (resultArray > 0) {
                return 1;
            }
            else if (resultArray === 0) {
                return 0;
            }
        } catch (e) {
            console.error('The updata operation failed\n', e);
            return null;
        }
    }
    async updataVehicles(payload, vehiclesId, updataData) {
        const userId = payload.user_id;
        try {
            const resultArray = await this.vehiclesModel.updataQuery(updataData, { user_id: userId, vehicles_id: vehiclesId });
            if (resultArray) {
                return 1;
            }
            else if (!resultArray) {
                return 0;
            }
        }
        catch (e) {
            console.error('The updata operation failed\n', e);
            return null;
        }
    }
}

export default personalPageService;