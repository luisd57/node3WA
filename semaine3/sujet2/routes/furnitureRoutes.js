import express from 'express';
import { createFurniture, listFurniture, getFurnitureDetails } from '../controllers/furnitureController.js';

const router = express.Router();

router.post('/create', createFurniture);
router.get('/list', listFurniture);
router.get('/:id', getFurnitureDetails);

export default router;
