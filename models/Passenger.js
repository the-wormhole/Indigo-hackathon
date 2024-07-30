const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  futureFlights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flight' }]
});


//Hashing middleware to secure passwords
passengerSchema.pre('save', async function(next){
  if(this.isModified('password') || this.isNew){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('Passenger', passengerSchema);
