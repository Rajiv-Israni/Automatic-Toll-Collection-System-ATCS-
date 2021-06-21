var Tesseract = require('tesseract.js');
var {mongoose} = require('../server/config/mongoose');

var Transaction = require('../server/models/Transaction');
var User = require('../server/models/User');
var Vehicle = require('../server/models/Vehicle');
var string;
var inr;
var d = new Date();
var e = d.getMonth();
var f = d.getDate();
var g = f + '/' + ++e;
var h = d.getHours();
var i = d.getMinutes();
var j = h + ':' + i;
var x;
var z;
var q;

console.log('listening on port 3000');

// var Transaction = require('../server/models/Transaction');
setTimeout(() => {
  Tesseract.recognize('./test1.jpg', {
      lang: 'eng',
      tessedit_char_blacklist: ''
  }).then(function(result){
    q = result.text;
    Vehicle.find({
    encryptednumber: q
  }).then(function(vehicle) {
    x = vehicle[0].userid;
    z = vehicle[0].number;
    if(vehicle[0].type === 'A') {
      inr = 100;
    }
    else if(vehicle[0].type === 'B') {
      inr = 200;
    }
    else {
      inr = 300;
    }
    const newTransaction = new Transaction({
      userid: x,
      number: z,
      amount: inr,
      date: g,
      time:j
    });
      newTransaction
        .save()
        .then(transaction => {
          console.log(transaction.userid);
          User.findById(transaction.userid).then(user => {
            var a = user.amount-transaction.amount;
            User.findByIdAndUpdate(user._id, {$set: {amount: a}}).then(result => {
              console.log(result);
            })
          });
        })
        .catch(err => console.log(err))
    });
  });

}, 15000);

setTimeout(() => {
  console.log('starting image processing!');
}, 5000);
