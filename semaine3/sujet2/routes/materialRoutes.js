import express from 'express';
import { createMaterial, getMaterial } from '../controllers/materialController.js';

const router = express.Router();

router.post('/create', createMaterial);
router.get('/:id', getMaterial);

export default router;
