const express = require('express');
const routes = require('./src/routes/api');
const bodyParser = require("body-parser");
const app= new express();



//security middleware import

const expressRateLimit = require('express-rate-limit');
const cors = require('cors');
const expressMongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const helmate = require('helmet');
const xss = require('xss-clean');

//database configuration
const mongoose = require("mongoose");


//security middleware implements
app.use(bodyParser.json())
app.use(cors());
app.use(helmate());
app.use(xss());
app.use(hpp());
app.use(expressMongoSanitize());


const limit = expressRateLimit({
    windowMs:15* 60* 1000, max:3000
})
app.use(limit);

//MongoDB Connection

let URL = "mongodb://127.0.0.1:27017/ToDo";
let OPTION = {user:'', pass:'', autoIndex:true};


mongoose.connect(URL,OPTION,(error)=>{
    console.log("Mongoose Connecting Successful");
    console.log(error);
})


app.use("/api/v1",routes);

app.use("*",(req, res)=>{
    res.status(400).json({status: 'fail', data:'not found'})
})

module.exports = app;