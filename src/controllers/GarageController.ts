import express from 'express';
import { getGarageByName , createGarage, updateGarageById, deleteGarageById, GarageModel, getGarages } from '../db/garage';


export const registerGarage = async (req: express.Request, res: express.Response) => {
  try {
    const { information, garageStatus, dateCreate } = req.body;

    if (!information || !garageStatus || !dateCreate) {
      return res.sendStatus(400);
    }

    const existingGarage = await getGarageByName(req.body.information.basic.name);
    if (existingGarage) {
      return res.sendStatus(400);
    }

    const garage = new GarageModel({
      information,
      garageStatus,
      dateCreate
    });

    await garage.save();

    return res.status(200).json(garage);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};


export const updateGarage = async (req: express.Request, res: express.Response) => {
  try {
    const { garageID } = req.params;
    const updateData = req.body;

    const existingGarage = await GarageModel.findById(garageID);

    if (!existingGarage) {
      return res.sendStatus(404);
    }

    existingGarage.information = updateData.information;
    existingGarage.garageStatus = updateData.garageStatus;
    existingGarage.dateCreate = updateData.dateCreate;

    await existingGarage.save();

    return res.status(200).json(existingGarage);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteGarage = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const existingGarage = await GarageModel.findById(id);

    if (!existingGarage) {
      return res.sendStatus(404);
    }

    await GarageModel.findByIdAndDelete(id);

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getGarageList = async (req: express.Request, res: express.Response) => {
  try {
    const garages = await getGarages();
    return res.status(200).json(garages);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

