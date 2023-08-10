import express from 'express';  

import { registerUser, assignAppointment,updateUser,deleteUser , getUser} from '../controllers/UserController';
import verifyJWT  from '../Middleware/verifyJWT';

export default (router: express.Router) => {
    router.post('/auth/register-user', registerUser);
    router.post('/auth/user/{$id}', assignAppointment);
    router.put('/auth/user/{$id}', updateUser);
    router.delete('/auth/user/{$id}', deleteUser);
    router.get('/auth/user',verifyJWT ,getUser);
    };
