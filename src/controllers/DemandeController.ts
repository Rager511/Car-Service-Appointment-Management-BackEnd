import express from 'express';
import { getDemandeById , createDemande, updateDemandeById,deleteDemandeById } from '../db/demande';

export const registerDemande = async (req: express.Request, res: express.Response) => {
  try {
    console.log(req.body);
    const { utilisateur,garageID,serviceName,date,infoService } = req.body;

    if (!utilisateur || !garageID || !serviceName || !infoService) {  
      return res.sendStatus(400);
    }

    /*const existingDemandes = await getDemandeById(req.body.id);

    if (existingDemandes) {
      return res.sendStatus(400);
    }*/

    const appointment = await createDemande({
      utilisateur,
      garageID,
      serviceName,
      date,
      infoService,
      },
    );

    return res.status(200).json(appointment).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateDemande = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const { userID, garageID, serviceId, type, description } = req.body;
  
      if (!userID || !garageID || !serviceId || !type || !description) {
        return res.sendStatus(400);
      }
  
      const existingDemande = await getDemandeById(id);
  
      if (!existingDemande) {
        return res.sendStatus(404);
      }
  
      const updatedDemande = await updateDemandeById(id, {
        userID,
        garageID,
        serviceId,
        type,
        description,
      });
  
      return res.status(200).json(updatedDemande);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  

export const deleteDemande = async (req: express.Request, res: express.Response) => {
try {
  const { id } = req.params;

  const existingDemande = await getDemandeById(id);

  if (!existingDemande) {
    return res.sendStatus(404);
  }

  await deleteDemandeById(id);

  return res.sendStatus(204);
} catch (error) {
  console.log(error);
  return res.sendStatus(500);
}
};