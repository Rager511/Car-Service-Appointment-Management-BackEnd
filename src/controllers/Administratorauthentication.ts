import express from 'express';
import { getAdministratorbyEmail,getAdministrator, createAdministrator, updateAdministratorById, deleteAdministratorById, getAdministrators, getAdministratorbySessionToken } from '../db/administrator';
import { authentication, random } from '../db/helpers';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

export const logoutAdministrator = async (req: express.Request, res: express.Response) => {
  try {
    const  {  refreshToken }  = req.cookies;
    if (!refreshToken) {
      return res.sendStatus(400);
    }
    
    const existingAdministrator = await getAdministratorbySessionToken(refreshToken);
    if (!existingAdministrator) {
      res.clearCookie('refreshToken', { httpOnly: true , sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json({ message: 'Not Logout' });
    }
     updateAdministratorById(existingAdministrator.id, { 'authentication.sessionToken': '' });
     res.clearCookie('refreshToken', { httpOnly: true , sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
     res.status(200).json({ message: 'Logout successful' });

  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};

export const refreshToken = async (req: express.Request, res: express.Response) => {
  try {
    const  { refreshToken }  = req.cookies;
    if (!refreshToken) {
      return res.sendStatus(400);
    }
    
    const existingAdministrator = await getAdministratorbySessionToken(refreshToken);
    if (!existingAdministrator) {
      return res.status(404);
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err || existingAdministrator.information.email !== decoded.username) {
          return res.status(403).json({ message: 'Invalid token' });
         }

         const accessToken = jwt.sign({name: existingAdministrator.information.basic.username , username: existingAdministrator.information.email , salt:existingAdministrator.information.authentication.salt }, process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: '40s' });
  
          return res.status(200).json({ accessToken });

      }
    );

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const loginAdministrator = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    
    const existingAdministrator = await getAdministratorbyEmail(email);
    if (!existingAdministrator) {
      return res.status(404).json({ message: 'Administrator not found' });
    }
    
    const salt = existingAdministrator.information.authentication.salt;
    const hashedPassword = authentication(salt, password);
    if (hashedPassword !== existingAdministrator.information.authentication.password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }    
    const accessToken = jwt.sign({
        name: existingAdministrator.information.basic.username ,
        username: existingAdministrator.information.email ,
        salt:existingAdministrator.information.authentication.salt }, process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '1m' });
    const refreshToken = jwt.sign({name: existingAdministrator.information.basic.username , username: existingAdministrator.information.email , salt:existingAdministrator.information.authentication.salt}, process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: '5m' });

    await updateAdministratorById(existingAdministrator.id, { 'authentication.sessionToken': refreshToken });

    res.cookie('refreshToken', refreshToken, { httpOnly: true , sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ accessToken });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const sendValidationEmail = (email:string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'imadmaailil20@gmail.com',
      pass: 'Graves511',
    },
  });
  const mailOptions = {
    from: 'imadmaailil20@gmail.com',
    to: email,
    subject: 'Account Registration Validation',
    text: 'Please click on the link below to validate your account:\nhttp://your-app-url.com/validate-account', 
  };

  // Send the email
  transporter.sendMail(mailOptions, (error:any, info:any) => {
    if (error) {
      console.error('Failed to send the validation email:', error);
    } else {
      console.log('Validation email sent:', info.response);
    }
  });
};

export const registerAdministrator = async (req: express.Request, res: express.Response) => {
  try {
    console.log(req.body);
    const { name, email, password, age, phone } = req.body;

    if (!name || !email || !password || !age || !phone) {
      return res.sendStatus(400);
    }

    const existingAdmin = await getAdministratorbyEmail(email);
    console.log(existingAdmin);
    if (existingAdmin) {
      return res.sendStatus(400);
    }
    const salt = random();
    const hashedPassword = authentication(salt, password);
    // You can generate a unique ID for the admin using mongoose's ObjectId or uuidv4()
    const adminId = uuidv4();

    // Create a new admin document based on the provided data
    const newAdminData = {
      _id: adminId,
      information: {
        Admin_type: '',
        UserAgent: '',
        location: '',
        settings: {},
        email,
        basic: {
          profilePic: '',
          username: name,
          firstName: '',
          middleName: '',
          lastName: '',
          fullName: '',
          abbreviation: '',
          nickname: '',
          nicknameCode: '',
          about: '',
        },
        authentication: {
          password: hashedPassword,
          salt,
        },
        phone: {
          id: '',
          countryCode: '',
          number: phone,
        },
    },
  };
  console.log(newAdminData);
    // Save the new admin document to the database
    const newAdmin = await createAdministrator(newAdminData);

    return res.status(200).json(newAdmin);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateAdministrator = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const { information, role, accountStatus, connect, dateCreate } = req.body;
  
      if (!information || !role || !accountStatus || !connect || !dateCreate) {
        return res.sendStatus(400);
      }
  
      const existingAdministrator = await getAdministrator(id);
  
      if (!existingAdministrator) {
        return res.sendStatus(404);
      }
  
      const updatedAdministrator = await updateAdministratorById(id, {
        information,
        role,
        accountStatus,
        connect,
        dateCreate,
        
      });
  
      return res.status(200).json(updatedAdministrator);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  
  export const deleteAdministrator = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
  
      const existingAdministrator = await getAdministrator(id);
  
      if (!existingAdministrator) {
        return res.sendStatus(404);
      }
  
      await deleteAdministratorById(id);
  
      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };

  export const getAdminList = async (_req: express.Request, res: express.Response) => {
    try {
      const admins = await getAdministrators();
      return res.status(200).json(admins);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).json({ message: 'Internal server error' });
    }
  };

  export const forgetPassword = async (req: express.Request, res: express.Response) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
  
      const existingAdministrator = await getAdministratorbyEmail(email);
  
      if (!existingAdministrator) {
        return res.status(404).json({ message: 'Administrator not found' });
      }
  
      const resetPasswordToken = uuidv4();
  
      await updateAdministratorById(existingAdministrator.id, { 'authentication.resetPasswordToken': resetPasswordToken });
  
      sendResetPasswordEmail(email, resetPasswordToken);
  
      return res.status(200).json({ message: 'Reset password email sent successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const sendResetPasswordEmail = (email: string, resetPasswordToken: string) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: '', 
        pass: '', 
      },
    });
  
    const resetPasswordLink = `http://your-app-url.com/reset-password?token=${resetPasswordToken}`;
  
    const mailOptions = {
      from: 'imadmaailil20@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `Click on the link below to reset your password:\n${resetPasswordLink}`,
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error('Failed to send the reset password email:', error);
      } else {
        console.log('Reset password email sent:', info.response);
      }
    });
  };
  export const getProfile = async (req: express.Request, res: express.Response) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      async (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) return res.sendStatus(403); // Invalid token
        //req.params.user = decoded.username;
        console.log(decoded.username);
          const admin = await getAdministratorbyEmail(decoded.username);
          console.log(admin);
          res.status(200).json(admin);
      });
  };
  
  
  