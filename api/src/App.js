//Maen Saassouh ©
import { DisplayStats } from './ManagePartners';
import './App.css';
const express = require('express')

const api = require('./api')
const app = express()
const config = {
  static: 'public', // Set static assets directory
  logging: true
}

//BACKEND VERSION - transform into express without react

app.use('/api', api) // sample API Route

app.listen(5000)
module.exports = app
