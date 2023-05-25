const express = require('express')
const app = express();
const mongoose = require('mongoose');
const Admin = require('./AdminModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRETKEY = process.env.JWT_SECRETKEY;

const AdminRouter = require('./routes/AdminRouter');

app.use(express.json())
app.use('/api/admin',AdminRouter);
app.listen(4000, () => {
  mongoose.connect(process.env.CLUSTER_URL)
  .then(() => {
    console.log('Database Connected')
  })
  .catch((err) => {
    throw err;
  })
  console.log('Server Started')
})