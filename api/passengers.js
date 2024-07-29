const express = require('express');
const Passenger = require('../models/Passenger');
const Flight = require('../models/Flight');

const router = express.Router();

// Endpoint to add passengers
router.post('/', async(req, res) =>{
  try{
    const passenger = new Passenger(req.body);
    await passenger.save();

    // Add passenger to flight
    const flight = await Flight.findOneAndUpdate(
      { flightNumber: passenger.flightNumber},
      { $push: {passengers: passenger._id } },
      {new: true }
    );

    if(!flight){
      return res.status(404).send({ error: 'Flight not found'});
    }

    res.status(201).send(passenger);
  }catch(error){
    res.status(500).send({error: 'Failed to add passenger', details: error.message });
  }
});

module.exports = router;
