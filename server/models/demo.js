const mongoose = require('mongoose');

var DemoSchema = new mongoose.Schema({
  model: {
    type: String,
    required: false,
    trim: true,
    minlength: 1
  },
  number: {
    type: String,
    required: false,
    trim: true,
    minlength: 1
  },
  type: {
    type: String,
    required: false,
    trim: true,
    minlength: 1
  }
});


const Demo = mongoose.model('Demo', DemoSchema);

module.exports = Demo;
