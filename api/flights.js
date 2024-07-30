const express = require('express');
const Flight = require('../models/Flight');
const Passenger = require('../models/Passenger');
const smsHandler = require("../handlers/smsHandler");
const mailHandler = require("../handlers/mailHandler");

const router = express.Router();

// Endpoint to add flights
router.post('/', async(req, res) =>{
  try{
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).send(flight);
  }catch(error){
    res.status(500).send({ error: 'Failed to add flight', details: error.message});
  }
});

// Endpoint to update flight status
router.put('/:flightNumber', async(req, res) =>{
  try{
    const flight = await Flight.findOneAndUpdate(
      { flightNumber: req.params.flightNumber},
      req.body,
      {new: true }
    ).populate('passengers');

    if(!flight){
      return res.status(404).send({error: 'Flight not found' });
    }

    // Fetch passengers of this flight
    const passengers = await Passenger.find({flightNumber: req.params.flightNumber });

    // Send notifications
    passengers.forEach(async (passenger) => {
      // Send SMS via Twilio
      const response = await smsHandler.createMessage(passenger.phone,flight);

      // Send Email via nodemailer
      mailHandler.sendEmail(passenger.email,'Flight Update Notification',flight);
    });

    res.send(flight);
  }catch(error){
    res.status(500).send({ error: 'Failed to update flight status', details: error.message });
  }
});

// Endpoint to check flight status
router.get('/:flightNumber', async(req,res) => {
  try{
    const flight = await Flight.findOne({ flightNumber: req.params.flightNumber }).populate('passengers');
    
    if(!flight){
      return res.status(404).send({ error: 'Flight not found' });
    }

    res.send(flight);
  }catch(error){
    res.status(500).send({ error: 'Failed to get flight status', details: error.message });
  }
});

module.exports = router;
