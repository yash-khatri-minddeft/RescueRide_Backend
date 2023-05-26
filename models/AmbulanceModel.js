const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
  AmbulanceNumber: {
    type: String,
    required: true,
    unique:true
  },
  Status: {
    type: String,
    required: true,
    default: 'ideal'
  }
})

const ambulance = new mongoose.model('ambulance', AmbulanceSchema);

module.exports = ambulance;