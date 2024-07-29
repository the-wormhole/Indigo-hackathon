const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const apiRouter = require('./api');
const port = config.port;

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*', // Update to your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
  }));

mongoose.connect(config.dbUri);

app.use('/api', apiRouter);

app.listen(port,(err)=>{
    if(err){
        console.log("Error in intiating the server!!");
    }

    console.log("Server up and running on post - ", port);
})

app.get('/',(req,res)=>{

    return res.status(200).json({
        message:"Hello World!"
    })
})