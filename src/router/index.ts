import express from 'express';

import Usercontrollers from './UserRouter';
import UserCVcontrollers from './UserCVRouter';
import Admincontrollers from './AdministratorRouter';
import Servicecontrollers from './ServiceRouter';
import Garagecontrollers from './GarageRouter';
import Demandecontrollers from './DemandeRouter';
import GarageAIcontrollers from './GarageAIRouter';
import RoleControllers from './RoleRouter';
const router = express.Router();

export default (): express.Router => {
    Usercontrollers(router);
    Admincontrollers(router);
    Servicecontrollers(router);
    Garagecontrollers(router);
    Demandecontrollers(router);
    UserCVcontrollers(router);
    GarageAIcontrollers(router);
    RoleControllers(router);
    
    return router;
};