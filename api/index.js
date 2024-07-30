const express = require('express');
const flightRoutes = require('./flights');
const passengerRoutes = require('./passengers');
const authRoutes = require('./auth');
const router = express.Router();

router.use('/flights', flightRoutes);
router.use('/passengers', passengerRoutes);
router.use('/auth', authRoutes);

router.use((err, req, res, next) =>{
  res.status(500).send({ error: 'Internal Server Error', details: err.message});
});

module.exports = router;
