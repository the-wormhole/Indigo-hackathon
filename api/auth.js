const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Passenger = require('../models/Passenger');
const Customer = require('../models/Customer');
const Flight = require('../models/Flight');
const router = express.Router();
const config = require('../config');

const JWT_SECRET = config.jwt;

// Signup route
router.post('/signup', async(req, res) =>{
  try{
    const {name, mobile, email, password} = req.body;
    const existingCustomer = await Customer.findOne({ $or: [{ mobile }, { email }] });
    if(existingCustomer){
      return res.status(400).json({message: 'Mobile number or email already in use'});
    }

    const customer = new Customer({name, mobile, email, password});
    await customer.save();
    
    const passengers = await Passenger.find({ phone:mobile });

    if (passengers.length > 0) {
      customer.passengers = passengers.map(passenger => passenger._id);
      await customer.save();
      // Update passengers to link to the new customer
      await Passenger.updateMany({ phone:mobile }, { customer: customer._id });
    }

    res.status(201).json({message: 'Signup successful'});
  }catch(error){
    res.status(500).json({message: 'Server error', error});
  }
});

// Login route
router.post('/login', async(req, res) =>{
  try{
    const {mobile, password} = req.body;
    const customer = await Customer.findOne({mobile});

    if(!customer){
      return res.status(400).json({message: 'Invalid credentials'});
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if(!isMatch){
      return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = jwt.sign({customerId: customer._id}, JWT_SECRET, {expiresIn: '1h'});

    res.json({token});
  }catch(error){
    console.log(error);
    res.status(500).json({message:'Server error', error});
  }
});

// Get future flights route
router.get('/future-flights', async(req, res) =>{
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const customer = await Customer.findById(decoded.customerId).populate('passengers');
    if (!customer) {
      return res.status(404).send({ error: 'Customer not found' });
    }
    
    const flightNumbers = customer.passengers.map(passenger => passenger.flightNumber);
    const flights = await Flight.find({ flightNumber: { $in: flightNumbers } }).populate('passengers');
    res.json(flights);

  }catch(error){
    console.log(error);
    res.status(401).json({message: 'Unauthorized', error});
  }
});

module.exports = router;
