import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    req.session.userId = user._id;
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: 'Registration failed.' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'Invalid credentials.' });
  }
  req.session.userId = user._id;
  res.status(200).send(user);
};

export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send({ error: 'Could not log out.' });
    } else {
      res.status(200).send({ message: 'Logged out.' });
    }
  });
};

