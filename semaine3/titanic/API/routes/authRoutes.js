import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.json({ status: 'success', message: 'User authenticated', user: req.user });
});

router.get('/auth/logout', (req, res) => {
  req.logout();
  res.json({ status: 'success', message: 'User logged out' });
});

export default router;



// import express from 'express';
// import { register, login, logout } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.post('/logout', logout);

// export default router;
