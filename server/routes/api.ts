import express from 'express';
import {
  getPets,
  addPet,
  deletePet,
  updatePet,
} from '../controllers/petController';

import { login } from '../controllers/userController';

const router = express.Router();

router.get('/pets', getPets);

router.post('/pets', addPet);

router.delete('/pets/:id', deletePet);

router.patch('/pets/:id', updatePet);

router.post('/login', login);

export default router;
