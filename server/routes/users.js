const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ObjectID} =require('mongodb');
var Razorpay = require('razorpay');
var hash = require('hash.js');
const mongoose = require('mongoose');
const mongoClient = require('mongodb').MongoClient;


// Load User model
var User = require('../models/User');
var Vehicle = require('../models/Vehicle');
var Demo = require('../models/Demo');

// Load razorpay
var instance = new Razorpay({
  key_id: 'rzp_test_IkoTi6kkz2CaLD',
  key_secret: 'Sw978YGQEUfyg5mKWcp3nwRW'
});


// Login Page
router.get('/login', (req, res) => res.render('login'));

//
router.get('/adminlogin', (req, res) => res.render('admin_login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });


        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});
//   }
// });
//
// // Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});
//
// // Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

// profile Update
router.post('/profileupdate', (req, res) => {
  const { id, phone, address, city, postalcode } = req.body;
  User.findByIdAndUpdate(id, {$set: {phone: phone, Address: address, City: city, Postalcode: postalcode} }).then(user => {
    req.flash(
      'success_msg',
      'Details updated successfully!'
    );
    res.redirect('/profile');
  })
  .catch(err => console.log(err));
});

router.post('/demo', (req, res) => {
  const { model, number, type } = req.body;
  const newDemo = new Demo({
    model,
    number,
    type
  });
  newDemo
    .save()
    .then(demo => {
      req.flash(
        'success_msg',
        'You are now registered and can log in'
      );
      // res.redirect('/users/login');
    })
    .catch(err => console.log(err));
});

//register Vehicle
router.post('/register_vehicle', (req, res) => {
  const {name, id, model, number, encryptednumber, type} = req.body;
  console.log(name, id, model, number, type);
  let errors = [];
  const newVehicle = new Vehicle({
  userid: id,
  model,
  number,
  encryptednumber,
  type
});
  // var encryptednumber;
  // if (!model || !number || !type) {
  //   errors.push({ msg: 'Please enter all fields' });
  // }
  //
  // if (errors.length > 0) {
  //   res.render('details_vehicle', {
  //     errors,
  //     name,
  //     id
  //   });

  var hashed = hash.sha256().update(number).digest('hex');
  var key1 = 'ZA';
  var key2 = 'A7';
  var pos = hashed.slice(8, 12);
  var key3 = pos.toUpperCase();
  var store = key3 + key1 + key2;
  console.log(store);
  newVehicle.encryptednumber = store;
  console.log(newVehicle.encryptednumber);

    Vehicle.findOne({ number: number }).then(vehicle => {
      if (vehicle) {
        errors.push({ msg: 'Vehicle is already registered' });
        res.render('details_vehicle', {
          errors,
          id,
          name,
        });
      } else {
        newVehicle
          .save()
          .then(vehicle => {
            req.flash(
              'success_msg',
              'New vehicle registered successfully!'
            );
            res.redirect('/details_vehicle');
          })
          .catch(err => console.log(err));
      }
    });
});

router.post("/recharge/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  instance.orders.create({amount: req.body.amount, currency: 'INR', receipt: 'abc123', payment_capture: false, notes: {'order': 'amount'}}).then((response) => {
    console.log(response);
  }).then(() => {
    User.findById(id).then(user =>{
      var a = (user.amount) + Number(req.body.amount);
      User.findByIdAndUpdate(user._id, {$set: {amount: a} }).then(result => {
        req.flash(
          'success_msg',
          'Recharge done successfully!'
        );
        res.redirect(`/recharge/${id}`);
      });
      // console.log(user);
    });
  }).catch((error) => {
    console.log(error);
  });
});

router.post('/get_details_vehicle', (req, res) => {
  const { id, name, number } = req.body;
  let errors = [];
  console.log(id, name, number);
  Demo.findOne({number: number}).then(demo => {
    if (!demo) {
      errors.push({ msg: 'Enter valid Number' });
      res.render('details_vehicle', {
        errors,
        id,
        name
      });
    } else {
    res.render('register_vehicles', {
      id,
      name,
      items: demo
    })
  }
  })
  .catch(err => console.log(err));
});

module.exports = router;
