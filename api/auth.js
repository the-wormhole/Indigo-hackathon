const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Passenger = require('../models/Passenger');
// const Flight = require('../models/Flight');
const router = express.Router();
const config = require('../config');

const JWT_SECRET = config.jwt;

// Signup route
router.post('/signup', async(req, res) =>{
  try{
    const {name, mobile, email, password} = req.body;
    const existingPassenger = await Passenger.findOne({ $or: [{ mobile }, { email }] });
    if(existingPassenger){
      return res.status(400).json({message: 'Mobile number or email already in use'});
    }

    const passenger = new Passenger({name, mobile, email, password});
    await passenger.save();
    res.status(201).json({message: 'Signup successful'});
  }catch(error){
    res.status(500).json({message: 'Server error', error});
  }
});

// Login route
router.post('/login', async(req, res) =>{
  try{
    const {mobile, password} = req.body;
    const passenger = await Passenger.findOne({mobile});
    if(!passenger){
      return res.status(400).json({message: 'Invalid credentials'});
    }

    const isMatch = await bcrypt.compare(password, passenger.password);
    if(!isMatch){
      return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = jwt.sign({passengerId: passenger._id}, JWT_SECRET, {expiresIn: '1h'});
    res.json({token});
  }catch(error) {
    res.status(500).json({message:'Server error', error});
  }
});

// Get future flights route
router.get('/future-flights', async(req, res) =>{
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const passenger = await Passenger.findById(decoded.passengerId).populate('futureFlights');
    res.json(passenger.futureFlights);
  }catch(error){
    res.status(401).json({message: 'Unauthorized', error});
  }
});

module.exports = router;
