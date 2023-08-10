import express from 'express';  

import {registerGarageAI, updateGarageAI, deleteGarageAI } from '../controllers/GarageAIController';

export default (router: express.Router) => {
    router.post('/register-garage-ai', registerGarageAI);
    router.put('/garage-ai/:id', updateGarageAI);
    router.delete('/garage-ai/:id', deleteGarageAI);
    };
