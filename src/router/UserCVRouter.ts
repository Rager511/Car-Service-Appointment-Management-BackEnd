import express from 'express';  

import { registerUserCV,updateUserCV,deleteUserCV } from '../controllers/UserCVController';
import { getUsersCV } from '../db/user_cv';

export default (router: express.Router) => {
    router.post('/auth/register-user-cv', registerUserCV);
    router.put('/auth/user-cv/{$id}', updateUserCV);
    router.delete('/auth/user-cv/{$id}', deleteUserCV);
    router.get('/auth/user-cv', getUsersCV);
    };
