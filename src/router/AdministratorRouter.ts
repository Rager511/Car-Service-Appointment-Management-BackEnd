import express from 'express'; 
import authMiddleware from '../Middleware/authMiddleware';
import verifyJWT from '../Middleware/verifyJWT';

import { getProfile, registerAdministrator, forgetPassword, sendValidationEmail, updateAdministrator, deleteAdministrator, getAdminList, loginAdministrator, refreshToken, logoutAdministrator, sendResetPasswordEmail } from '../controllers/Administratorauthentication';

export default (router: express.Router) => {
  // No need to verifyJWT for login and register routes
  router.post('/auth/register-admin', registerAdministrator);
  router.post('/auth/login-admin', loginAdministrator);

  // Apply verifyJWT middleware to all other routes for authentication
  router.use('/auth', verifyJWT);
  router.get('/auth/get-profile', getProfile);
  router.get('/auth/refresh-token', refreshToken);
  router.get('/auth/logout-admin', logoutAdministrator);
  router.post('/auth/forget-password', forgetPassword);
  router.post('/auth/validate-email', sendValidationEmail);
  
  // Apply authMiddleware to routes that require logged-in users
  router.use('/auth/admin', authMiddleware);
  router.put('/auth/admin/:id', updateAdministrator);
  router.delete('/auth/admin/:id', deleteAdministrator);
  router.get('/auth/admins', getAdminList);

  // Redirect all other routes to /auth/login-admin
  router.get('*', (req, res) => {
    if (!req.originalUrl.startsWith('/auth/login-admin') && !req.originalUrl.startsWith('/auth/register-admin')) {
      res.redirect('/auth/login-admin');
    } else {
      res.sendStatus(404); // Handle cases where the URL starts with /auth/login-admin or /auth/register-admin but does not match any route
    }
  });
};
