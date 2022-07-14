const express = require('express');
const bodyParser = require('body-parser');
const Order = require('../model/order');
const router = express.Router();

router.use(bodyParser());

router.get('/orders', async (req, res) => {
  const posts = await Order.find({ user: req.user });
  res.json({
    status: 'success',
    posts,
  });
});

router.post('/orders', async (req, res) => {
  try {
    const order = await Order.create({
      name: req.body.name,
      user_id: req.user,
      order: req.body.order,
      restaurent: req.body.restaurent,
      delivery_status: req.body.delivery_status,
      feedback: req.body.feedback,
      user_email: req.body.user_email,
    });
    return res.json({
      status: 'success',
      order,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'Failed',
      message: e.message,
    });
  }
});

router.put('/orders/:id', async (req, res) => {
  const order = await Order.updateOne({ _id: req.params.id, user_id: req.user }, { body: req.body.body });

  if (order.modifiedCount > 0) {
    res.json({
      status: 'Updated',
    });
  } else {
    res.json({
      status: 'You cannot update this order',
    });
  }
});

module.exports = router;
