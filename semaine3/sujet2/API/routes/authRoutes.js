import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);

authRoutes.post('/login', loginUser);

authRoutes.post('/logout', logoutUser);

export default authRoutes;
