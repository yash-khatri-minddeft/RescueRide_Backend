const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
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
  }
})

const admin = new mongoose.model('admin', AdminSchema);

module.exports = admin;