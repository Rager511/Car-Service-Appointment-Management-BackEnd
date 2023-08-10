import express from 'express';
import { registerRole, getRoles } from '../controllers/RoleController';

export default (router: express.Router) => {
  router.post('/register-role', registerRole);
  router.get('/auth/role', getRoles);
};