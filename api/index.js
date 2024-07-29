const express = require('express');
const flightsRouter = require('./flights');
const passengersRouter = require('./passengers');

const router = express.Router();

router.use('/flights', flightsRouter);
router.use('/passengers', passengersRouter);

router.use((err, req, res, next) =>{
  res.status(500).send({ error: 'Internal Server Error', details: err.message});
});

module.exports = router;
