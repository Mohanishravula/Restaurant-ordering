const express = require('express');
const User = require('../model/user');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json({
    status: 'success',
    users,
  });
});

router.get('*', async (req, res) => {
  res.status(404).json({
    status: 'failed',
    message: 'page not found',
  });
});

module.exports = router;
