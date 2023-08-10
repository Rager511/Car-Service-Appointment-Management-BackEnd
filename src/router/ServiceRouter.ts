import express from 'express';  

import { registerService, updateService, deleteService } from '../controllers/ServiceController';
import { getGroupServices } from '../db/group_service';

export default (router: express.Router) => {
    router.post('/register-service', registerService);
    router.put('/service/:id', updateService);
    router.delete('/service/:id', deleteService);
    router.get('/auth/service', getGroupServices);
    };
