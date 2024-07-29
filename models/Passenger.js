const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true},
  flightNumber: { type: String, required: true },
  pnr: { type: String, required: true },
  email: { type: String},
  phone: { type: String }
});

module.exports = mongoose.model('Passenger', passengerSchema);
