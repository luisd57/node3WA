import express from 'express';
import passport from 'passport';
import { register, login, logout } from '../controllers/authController.js';


const router = express.Router();

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  const userParam = encodeURIComponent(JSON.stringify(req.user));

  res.redirect(`http://localhost:4200/auth/callback?user=${userParam}`);
});

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


export default router;