const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var {mongoose} = require('../config/mongoose');
var assert = require('assert');
var Vehicle = require('../models/Vehicle');
var User = require('../models/User');
var Transaction = require('../models/Transaction');

// var url = 'mongodb://localhost:27017/ATCS';


// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

router.get('/img', (req, res) => res.start(app.js));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    id: req.user.id,
    name: req.user.name
  })
);

router.get('/Admindashboard', ensureAuthenticated, (req, res) =>
  res.render('admin_dashboard', {
    id: req.user.id,
    name: req.user.name
  })
);

router.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', {
    id: req.user.id,
    name: req.user.name
  })
);

router.get('/profileview/:id', ensureAuthenticated, (req, res) =>{
  var id = req.params.id;
  assert.equal(null);
  User.find({
    _id: id
  }).then(result => {
    console.log(result);
    res.render('profileview', {items: result});
  });
});

router.get('/details_vehicle', ensureAuthenticated, (req, res) =>
  res.render('details_vehicle', {
    id: req.user.id,
    name: req.user.name
  })
);

router.get('/register_vehicles/:id', ensureAuthenticated, (req, res) =>
  res.render('register_vehicles', {
    id: req.user.id,
    name: req.user.name
  })
);

router.get('/registered_vehicles/:id', ensureAuthenticated, (req, res) => {
    var id = req.params.id;
    console.log(id);
    var resultArray = [];
    assert.equal(null);
     Vehicle.find({
      userid: id
    }).then(result=>{
      console.log(result);
      res.render('registered_vehicles', { id, items: result});
    });
    // cursor.forEach(function(doc, err) {
    //   assert.equal(null, err);
    //   resultArray.push(doc);
    // }, function() {
    //   res.render('registered_vehicles', {items: resultArray});
    // });
});

router.get('/transactions/:id', ensureAuthenticated, (req, res) => {
    var id = req.params.id;
    console.log(id);
    var resultArray = [];
    assert.equal(null);
     Transaction.find({
      userid: id
    }).then(result=>{
      res.render('transaction', { id, items: result});
    });
    // cursor.forEach(function(doc, err) {
    //   assert.equal(null, err);
    //   resultArray.push(doc);
    // }, function() {
    //   res.render('registered_vehicles', {items: resultArray});
    // });
});

router.get('/recharge/:id', ensureAuthenticated, (req, res) =>
  res.render('payment', {
    id: req.user.id,
    name: req.user.name
  })
);

module.exports = router;
