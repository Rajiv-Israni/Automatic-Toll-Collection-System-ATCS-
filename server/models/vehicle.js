const mongoose = require('mongoose');

var VehicleSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  model: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  number: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  encryptednumber: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  type: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});


const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;
