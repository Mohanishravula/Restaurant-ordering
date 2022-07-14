const express = require('express');
const bodyParser = require('body-parser');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
SECRET = 'RESTAPI';

const { body, param, validationResult } = require('express-validator');

const router = express.Router();

router.use(bodyParser());

router.post('/register', body('email'), body('name'), async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      return res.status(400).json({
        status: 'failed',
        message: 'incorrect username/email/password',
      });
    }
    try {
      const user = await User.create({
        name,
        email,
        password: hash,
      });
      return res.status(200).json({
        status: 'Success',
        data: user,
      });
    } catch (e) {
      return res.status(400).json({
        status: 'Failed',
        message: e.message,
      });
    }
  });
});

router.post('/login', body('email'), body('password'), async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 'failed',
        message: 'email not found',
      });
    }
    bcrypt.compare(password, user.password).then(function (result) {
      if (result) {
        var token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: user._id,
          },
          SECRET
        );

        return res.status(200).json({
          status: 'success',
          token,
        });
      } else {
        return res.status(401).json({
          status: 'failed',
          message: 'try again',
        });
      }
    });
  } catch (e) {
    return res.status(500).json({
      status: 'Failed',
      message: e.message,
    });
  }
});

module.exports = router;
