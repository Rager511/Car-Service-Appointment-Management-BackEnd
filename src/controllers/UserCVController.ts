import express from 'express';
import { getUserCVById, getUserCVByEmail, createUserCV, updateUserCVById, deleteUserCVById, UserCVModel } from '../db/user_cv';

export const registerUserCV = async (req: express.Request, res: express.Response) => {
    try {
      const {
        _id,
        user_id,
        label,
        title,
        education,
        experience
      } = req.body;
  
      if (!_id || !user_id || !label || !title || !education || !experience) {
        return res.sendStatus(400);
      }
  
      // Check if the user already exists
      const existingUser = await getUserCVByEmail(user_id);
  
      if (existingUser) {
        return res.sendStatus(400);
      }
  
      const userCV = {
        _id,
        user_id,
        label,
        title,
        education,
        experience
      };
  
      // Create the user CV
      const newUserCV = await createUserCV(userCV);
  
      // Save the user CV to the database
      await newUserCV.save();
  
      return res.status(200).json(newUserCV);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };

  export const updateUserCV = async (req: express.Request, res: express.Response) => {
    try {
      const { userId } = req.params;
      const updateData = req.body;
  
      const existingUserCV = await UserCVModel.findById(userId);
  
      if (!existingUserCV) {
        return res.sendStatus(404);
      }
  
      existingUserCV.user_id = updateData.user_id;
      existingUserCV.label = updateData.label;
      existingUserCV.title = updateData.title;
      existingUserCV.education = updateData.education;
      existingUserCV.experience = updateData.experience;
  
      await existingUserCV.save();
  
      return res.status(200).json(existingUserCV);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  export const deleteUserCV = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
  
      const existingUser = await UserCVModel.findById(id);
  
      if (!existingUser) {
        return res.sendStatus(404);
      }
  
      await UserCVModel.findByIdAndDelete(id);
  
      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  