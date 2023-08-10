import express from 'express';
import { getGroupServiceById , createGroupService, updateGroupServiceById , deleteGroupServiceById } from '../db/group_service';

export const registerService = async (req: express.Request, res: express.Response) => {
  try {
    const { _id,icon,name,businessname,abbreviation,description,services } = req.body;

    if (!_id || !icon || !name || !businessname || !abbreviation || !description || !services) {    
      return res.sendStatus(200);
    }

    const existingServices = await getGroupServiceById(req.body.id);

    if (existingServices) {
      return res.sendStatus(400);
    }

    const Service = await createGroupService({
        _id,
        icon,
        name,
        businessname,
        abbreviation,
        description,
        services,
      },
    );

    return res.status(200).json(Service).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateService = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { _id,icon,name,businessname,abbreviation,description,services } = req.body;

    if (!_id || !icon || !name || !businessname || !abbreviation || !description || !services) {
      return res.sendStatus(400);
    }

    const existingService = await getGroupServiceById(id);

    if (!existingService) {
      return res.sendStatus(404);
    }

    const updatedService = await updateGroupServiceById(id, {
      _id,
      icon,
      name,
      businessname,
      abbreviation,
      description,
      services,
    });

    return res.status(200).json(updatedService);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteService = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const existingService = await getGroupServiceById(id);

    if (!existingService) {
      return res.sendStatus(404);
    }

    await deleteGroupServiceById(id);

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
