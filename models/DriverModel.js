const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  ambulanceID: {
    type: String,
    required: true,
    default: null
  }
})

const driver = new mongoose.model('driver', DriverSchema);

module.exports = driver;