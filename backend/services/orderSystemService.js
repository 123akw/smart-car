import Querier from '../database/querier.js';
import Orders from '../database/moudel/orders.js';


class OrderSystemService {
    constructor() {
        this.ordersModel = new Querier(Orders);
    }

    async addOrder(payload, data) {
        data.user_id = payload.user_id;
        try {
            await this.ordersModel.insertQuery(data);
            console.log('\x1b[36m%s\x1b[0m', 'The add order operation success');
            return true;
        } catch (e) {
            console.error('The add order operation failed\n', e);
            return false;
        }
    }

    async deleteOrder(payload, orderId) {
        const userId = payload.user_id;
        try {
            const resultArray = await this.ordersModel.deleteQuery({user_id: userId, order_id: orderId});
            if (resultArray) {
                return 1;
            } else if (!resultArray) {
                return 0;
            }
        } catch (e) {
            console.error('The delete operation failed\n', e);
            return null;
        }
    }
    async getOrdersHistory(payload) {
        const userId = payload.user_id;
        try {
            const orderHistories = await this.ordersModel.selectWhere({user_id: userId});
            if (Array.isArray(orderHistories) && orderHistories.length === 0) {
                console.error('Not found based on the user_id');
                return -1;
            } else if (Array.isArray(orderHistories) && orderHistories.length > 0) {
                return orderHistories;
            }
        } catch (e) {
            console.error('The get orders operation failed\n', e);
            return null;
        }
    }
    async updatePayState(payload,orderId,state){
        const userId=payload.user_id;
        try{
            const resultArray = await this.ordersModel.updateQuery(
                {pay_state:state},
                {user_id:userId,order_id:orderId});
            if (resultArray) {
                return 1;
            }
            else if (!resultArray) {
                return 0;
            }
        }catch (e) {
            console.error('The update operation failed\n', e);
            return null;
        }
    }
}

export default OrderSystemService;
