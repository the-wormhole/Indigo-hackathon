const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, sparse:true },
  mobile:{ type: String, required: true, unique: true, sparse:true },
  password: { type: String, required: true },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Passenger' }]
});

//Hashing middleware to secure passwords
customerSchema.pre('save', async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Customer', customerSchema);
