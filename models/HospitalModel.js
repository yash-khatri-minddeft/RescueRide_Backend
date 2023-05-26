const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  }
})

const hospital = new mongoose.model('hospital', HospitalSchema);

module.exports = hospital;