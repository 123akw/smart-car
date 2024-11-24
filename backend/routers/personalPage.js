import { addVehicle, deleteVehicle, getProfile, getVehicles, updateProfile, updateVehicle } from '../controllers/personalPageController.js';
import tokenMiddleware from '../utility/tokenMiddleware.js';
import express from 'express';

const personalPageRouter = express.Router();


personalPageRouter.post('/addVehicle', tokenMiddleware, addVehicle);
personalPageRouter.post('/deleteVehicle', tokenMiddleware, deleteVehicle);
personalPageRouter.get('/getProfile', tokenMiddleware, getProfile);
personalPageRouter.get('/getVehicles', tokenMiddleware, getVehicles);
personalPageRouter.post('/updateProfile', tokenMiddleware, updateProfile);
personalPageRouter.post('/updateVehicle', tokenMiddleware, updateVehicle);

export default personalPageRouter;