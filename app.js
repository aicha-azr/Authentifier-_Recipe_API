const crypto = require('crypto');
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const url =process.env.url;
const app = express();
const port = 5001;
const auth = require('./Router/authentification')
const recepiesRouter = require("./Router/recipiesRouter")

mongoose.connect(url)
.then(console.log("you are connected"))
.catch((e) => {
    console.error('Failed to connect to MongoDB:', e.message);
  })
  app.use(express.json());
  app.use('/', auth); 
  app.use('/api', recepiesRouter); 

app.listen(port, ()=>{
  console.log(`app listining at http://localhost:${port}/`);})