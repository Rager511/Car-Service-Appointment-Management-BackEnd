import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.redirect('/auth/login-admin'); // Redirect to login page
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.redirect('/auth/login-admin'); // Redirect to login page on invalid token
      }
      next(); // Token is valid, proceed to the next middleware or route
    }
  );
};

export default authMiddleware;
