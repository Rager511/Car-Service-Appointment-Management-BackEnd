import express from 'express';  

import { registerDemande, updateDemande, deleteDemande} from '../controllers/DemandeController';
import { getDemandes } from '../db/demande';

export default (router: express.Router) => {
    router.post('/register-demande', registerDemande);
    router.put('/demande/{$id}', updateDemande);
    router.delete('/demande/{$id}', deleteDemande);
    router.get('/demandes', getDemandes);
    };
