const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  user_longitude: {
    type: Number,
    required: true,
  },
  user_latitude: {
    type: Number,
    required: true,
  },
  hospitalid: {
    type: String,
    required: true,
  },
  type_of_ambulance: {
    type: String,
    required: true,
  },
  ambulance_number: {
    type: String,
    required: true,
    default: "null",
  },
  ambulance_longitude: {
    type: Number,
    required: true,
    default: 0,
  },
  ambulance_latitude: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  }
});

const booking = new mongoose.model("booking", BookingSchema);
module.exports = booking;
