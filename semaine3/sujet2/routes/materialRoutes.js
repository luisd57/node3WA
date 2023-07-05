import express from 'express';
import { createMaterial } from '../controllers/materialController.js';

const router = express.Router();

router.post('/create', createMaterial);

export default router;
