import express from 'express';  

import {registerGarage, updateGarage, deleteGarage, getGarageList } from '../controllers/GarageController';
import { getGarages } from 'db/garage';

export default (router: express.Router) => {
    router.post('/register-garage', registerGarage);
    router.put('/garage/:id', updateGarage);
    router.delete('/garage/:id', deleteGarage);
    router.get('/garage', getGarageList);
    };
