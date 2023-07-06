import express from 'express';
import { createMaterial, getMaterial, listMaterials } from '../controllers/materialController.js';

const router = express.Router();

router.post('/create', createMaterial);
router.get('/list', listMaterials);
router.get('/:id', getMaterial);


export default router;
