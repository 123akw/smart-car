import { addVehicle, deleteVehicle, getProfile, getVehicles, updataProfile, updataVehicle } from '../controllers/personalPageController.js';
import tokenMiddenware from '../utility/tokenMiddenware.js';
import express from 'express';

const personalPageRouter = express.Router();


personalPageRouter.post('/addVehicle', tokenMiddenware, addVehicle);
personalPageRouter.post('/deleteVehicle', tokenMiddenware, deleteVehicle);
personalPageRouter.get('/getProfile', tokenMiddenware, getProfile);
personalPageRouter.get('/getVehicles', tokenMiddenware, getVehicles);
personalPageRouter.post('/updataProfile', tokenMiddenware, updataProfile);
personalPageRouter.post('/updataVehicle', tokenMiddenware, updataVehicle);

export default personalPageRouter;