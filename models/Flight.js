const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  airline:{ type: String, required: true, default: "Indigo"},
  status: { type: String, required: true },
  gate: { type: String },
  ScheduledDepartureTime: { type: Date },
  ScheduledArrivalTime: { type: Date },
  ActualDepartureTime:{ type: Date , 
    // default: "null"
  },
  ActualArrivalTime:{ type: Date, 
    // default: "null"
  },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Passenger'}]
});

module.exports = mongoose.model('Flight',flightSchema);
