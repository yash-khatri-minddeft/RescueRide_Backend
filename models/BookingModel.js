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
    type: Number,
    required: true,
  },
  types_of_ambulance: {
    type: String,
    required: true,
  },
  ambulance_longitude: {
    type: Number,
  },
  ambulance_latitude: {
    type: Number,
  },
});

const booking = new mongoose.model("booking", BookingSchema);
module.exports = booking;
