// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
// res.send('Hello World!');
// });

// var server = app.listen(3000, function () {
// var host = server.address().address;
// var port = server.address().port;

// console.log('Example app listening at http://%s:%s', host, port);
// });

//Maen Saassouh ©
// import { DisplayStats } from './ManagePartners';
// import './App.css';
const express = require('express')
const portNum = 5000
const api = require('./api')
const app = express()
const config = {
  static: 'public', // Set static assets directory
  logging: true
}

//BACKEND VERSION - transform into express without react

app.use('/api', api) // sample API Route

app.listen(portNum)
module.exports = app

