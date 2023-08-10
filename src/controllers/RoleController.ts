import express from 'express';
import { getRoleById, createRole} from '../db/role';
import getAllRoles from '../db/role';

export const registerRole = async (req: express.Request, res: express.Response) => {
  try {
    const { _id, name, Permissions } = req.body;

    if (!name || !Permissions) {
      return res.sendStatus(400);
    }

    const existingRoles = await getRoleById(_id); 

    if (existingRoles) {
      return res.sendStatus(400);
    }

    const newRole = await createRole({
      _id,
      name,
      Permissions,
    });

    return res.status(200).json(newRole);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getRoles = async (req: express.Request, res: express.Response) => {
    try {
      const roles = await getAllRoles(); // Use the default export
      return res.status(200).json(roles);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
