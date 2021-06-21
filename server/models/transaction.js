const mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  number: {
    type: String,
    required: true,
    trim: true,
    minlength:1
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
    minlength:1
  },
  date: {
    type: String,
    required: true,
    trim: true,
    minlength:1
  },
  time: {
    type: String,
    required: true,
    trim: true,
    minlength:1
  }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
