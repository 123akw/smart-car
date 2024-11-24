import express from 'express';
import tokenMiddenware from '../utility/tokenMiddleware.js';
import {addOrder, deleteOrder, getOrdersHistory, updatePayState} from '../controllers/orderSystemController.js';

const orderRouter = express.Router();


orderRouter.post('/addOrder', tokenMiddenware, addOrder);
orderRouter.post('/deleteOrder', tokenMiddenware, deleteOrder);
orderRouter.get('/getOrderHistory', tokenMiddenware, getOrdersHistory);
orderRouter.get('/updatePayState', tokenMiddenware, updatePayState);


export default orderRouter;