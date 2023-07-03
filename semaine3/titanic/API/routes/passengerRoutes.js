import express from 'express';
import { getAlivePassengers, getAliveMen, getAliveWomen, getAllPassengers } from '../controllers/passengerController.js';

const router = express.Router();

router.get('/', getAllPassengers);
router.get('/alivePassengers', getAlivePassengers);
router.get('/aliveMen', getAliveMen);
router.get('/aliveWomen', getAliveWomen);

export default router;
