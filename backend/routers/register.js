import express from 'express';
import { register } from '../controllers/authContronller.js';

const registerRouter = express.Router();

registerRouter.post('/register', register);

export default registerRouter;