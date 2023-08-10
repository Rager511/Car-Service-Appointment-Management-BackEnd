import express from 'express';
import { getGarageAIById, getGarageAIByEmail, createGarageAI, updateGarageAIById, deleteGarageAIById, GarageAIModel } from '../db/garages_AI';

export const registerGarageAI = async (req: express.Request, res: express.Response) => {
    try {
      const {
        _id,
        garage_id,
        team,
        branches,
        services,
        reviews,
      } = req.body;
  
      if (!_id || !garage_id || !team || !branches || !services || !reviews) {
        return res.sendStatus(400);
      }
  
      // Check if the user already exists
      const existingGarageAI = await getGarageAIByEmail(req.body._id);
  
      if (existingGarageAI) {
        return res.sendStatus(400);
      }
  
      const garageAI = {
        _id,
        garage_id,
        team,
        branches,
        services,
        reviews,
      };
  
      // Create the user CV
      const newGarageAI = await createGarageAI(garageAI);
  
      // Save the user CV to the database
      await newGarageAI.save();
  
      return res.status(200).json(newGarageAI);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };

  export const updateGarageAI = async (req: express.Request, res: express.Response) => {
    try {
      const { garageAIid } = req.params;
      const updateData = req.body;
  
      const existingGarageAI = await GarageAIModel.findById(garageAIid);
  
      if (!existingGarageAI) {
        return res.sendStatus(404);
      }
  
      existingGarageAI.id = updateData.id;
      existingGarageAI.garage_id = updateData.garage_id;
      existingGarageAI.team = updateData.team;
      existingGarageAI.branches = updateData.branches;
      existingGarageAI.services = updateData.services;
      existingGarageAI.reviews = updateData.reviews;
  
      await existingGarageAI.save();
  
      return res.status(200).json(existingGarageAI);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  export const deleteGarageAI = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
  
      const existingGarageAI = await GarageAIModel.findById(id);
  
      if (!existingGarageAI) {
        return res.sendStatus(404);
      }
  
      await GarageAIModel.findByIdAndDelete(id);
  
      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };