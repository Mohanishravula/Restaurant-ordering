const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  name: { type: String },
  restaurent: { type: String },
  order: { type: Object },
  user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
  user_name: { type: String },
  delivery_status: { type: Boolean },
  price: { type: mongoose.Types.Decimal128 },
  feedback: { type: String },
  user_mobile: { type: String },
  user_email: { type: String },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
