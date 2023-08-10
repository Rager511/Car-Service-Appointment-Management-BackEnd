import express from 'express';
import { getUserById, getUserByEmail, createUser, updateUserById, deleteUserById, UserModel, getUsers } from '../db/user';
import { v4 as uuidv4 } from 'uuid';


export const assignAppointment = async (req: express.Request, res: express.Response) => {
  console.log("ok");
};

export const registerUser = async (req: express.Request, res: express.Response) => {
  try {
    const {
      information,
      userRole,
      isProfessionalAccount,
      accountStatus,
      connect,
      dateCreate,
    } = req.body;

    if (!information || !userRole || !isProfessionalAccount || !accountStatus || !connect || !dateCreate) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(information.loginCredentials.username);


    if (existingUser) {
      return res.sendStatus(400);
    }

    const user = await createUser({
      _id: uuidv4(), // Generate a unique ID for the user
      information,
      userRole,
      isProfessionalAccount,
      accountStatus,
      connect,
      dateCreate,
    });

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    const existingUser = await UserModel.findById(userId);

    if (!existingUser) {
      return res.sendStatus(404);
    }

    existingUser.information = updateData.information;
    existingUser.userRole = updateData.userRole;
    existingUser.isProfessionalAccount = updateData.isProfessionalAccount;
    existingUser.accountStatus = updateData.accountStatus;
    existingUser.connect = updateData.connect;
    existingUser.dateCreate = updateData.dateCreate;

    await existingUser.save();

    return res.status(200).json(existingUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const existingUser = await UserModel.findById(id);

    if (!existingUser) {
      return res.sendStatus(404);
    }

    await UserModel.findByIdAndDelete(id);

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {

    const User = await getUsers();
    return res.status(200).json(User);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

