// const express = require('express');
// const Passenger = require('../models/Passenger');
// const Flight = require('../models/Flight');

// const router = express.Router();

// // Endpoint to add passengers
// router.post('/', async(req, res) =>{
//   try{
//     const passenger = new Passenger(req.body);
//     await passenger.save();

//     // Add passenger to flight
//     const flight = await Flight.findOneAndUpdate({ flightNumber: passenger.flightNumber},
//       { $push: {passengers: passenger._id } },
//       {new: true }
//     );

//     if(!flight){
//       return res.status(404).send({ error: 'Flight not found'});
//     }

//     res.status(201).send(passenger);
//   }catch(error){
//     res.status(500).send({error: 'Failed to add passenger', details: error.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Passenger = require('../models/Passenger');
const Customer = require('../models/Customer');
const Flight = require('../models/Flight');

// Add a new passenger
router.post('/', async(req, res) =>{
  try{
    const { name, flightNumber, pnr, phone, email } = req.body;
    const passenger = new Passenger({ name, flightNumber, pnr, phone, email });

    // Find the customer by email
    const customer = await Customer.findOne({ email });
    console.log(customer);
    if(customer){
      passenger.customer = customer._id;
      customer.passengers.push(passenger._id);
      await customer.save();
    }

    const flight = await Flight.findOneAndUpdate({ flightNumber: passenger.flightNumber},
      { $push: {passengers: passenger._id } },
      {new: true }
    );

    if(!flight){
      return res.status(404).send({ error: 'Flight not found'});
    }

    await passenger.save();
    res.status(201).send(passenger);
  }catch(error){
    res.status(500).send({error: 'Failed to add passenger', details: error.message });
  }
});

module.exports = router;


