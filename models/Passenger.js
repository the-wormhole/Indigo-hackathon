const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  flightNumber: { type: String, required: true },
  pnr: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone:{ type: String, required: true, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null }
});

module.exports = mongoose.model('Passenger', passengerSchema);
