import jwt from 'jsonwebtoken';

import { Querier } from '../database/querier';
import {Vehicles} from '../database/moudel/vehicles.js';

class VehiclesService{
    constructor() {
        this.moduleInstance=new Querier(Vehicles);
    }
    
}