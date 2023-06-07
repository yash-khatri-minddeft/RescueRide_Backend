const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
  AmbulanceNumber: {
    type: String,
    required: true,
    unique: true
  },
  Status: {
    type: String,
    required: true,
    default: 'ideal'
  },
  type: {
    type: String,
    required: true
  },
  driverName: {
    type: String,
    required: true,
  },
  driveNo: {
    type: Number,
    required: true
  },
  driverEmail: {
    type: String,
    required: true,
  },
  driverPassword: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
    default: "0.0"
  },
  longitude: {
    type: Number,
    required: true,
    default: "0.0"
  },
  route: [{
    r_latitude: Number,
    r_longitude: Number
  }]
})

const ambulance = new mongoose.model('ambulance', AmbulanceSchema);

module.exports = ambulance;