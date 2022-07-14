const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

SECRET = 'RESTAPI';

const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');

const postRoutes = require('./routes/order');
const app = express();

mongoose.connect('mongodb://localhost:27017/Restaurent-ordering');

app.use('/orders', (req, res, next) => {
  var token = req.headers.authorization.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({
      status: 'failed',
      message: 'Token not found',
    });
  }
  jwt.verify(token, SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        status: 'failed',
        message: 'invalid token',
      });
    } else {
      req.user = decoded.data;
      next();
    }
  });
});

app.use('/', loginRoutes);
app.use('/users', userRoutes);
app.use('/', postRoutes);

app.listen(3000, () => {
  console.log('server is listening');
});
