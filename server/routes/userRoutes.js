import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { uid, email, name, ...otherData } = req.body;
  if (!uid || !email) {
    return res.status(400).json({
      message: 'Missing required fields !',
    });
  }
  try {
    let user = await User.findOne({ uid });
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      Object.assign(user, otherData);
      user.updatedAt = Date.now();
    } else {
      user = new User({
        uid,
        name,
        email,
        ...otherData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;