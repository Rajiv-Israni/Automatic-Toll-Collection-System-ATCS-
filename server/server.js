const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const publicPath = path.join(__dirname, '../server');
var {mongoose} = require('./config/mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var Razorpay = require('razorpay');

// // const publicPath = path.join(__dirname, '../public');



const app = express();

app.use(express.static(publicPath));
// Passport Config
require('./config/passport')(passport);

var instance = new Razorpay({
  key_id: 'rzp_test_IkoTi6kkz2CaLD',
  key_secret: 'Sw978YGQEUfyg5mKWcp3nwRW'
});

// DB Config
// const db = require('./config/keys').mongoURI;

// Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// // Express body parser
app.use(express.urlencoded({ extended: true }));

// // Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
//
// // Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//
// // Connect flash
app.use(flash());
//
// // Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));








// const path = require('path');
// const http = require('http');
// const express = require('express');
// const _ = require('lodash');
// const {ObjectID} = require('mongoose')
// var Razorpay = require('razorpay');
//
// const publicPath = path.join(__dirname, '../public');
// const port = process.env.PORT || 3000;
// var {mongoose} = require('./db/mongoose');
// var {User} = require('./models/user');
// var {authenticate} = require('./middleware/authenticate');
// var bodyParser = require('body-parser');
// var app = express();
// var server = http.createServer(app);
// var instance = new Razorpay({
//   key_id: 'rzp_test_IkoTi6kkz2CaLD',
//   key_secret: 'Sw978YGQEUfyg5mKWcp3nwRW'
// });
//
//
//
// app.use(express.static(publicPath));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended : true}));



// app.post("/user/signup", (req, res) => {
//   var body = _.pick(req.body, ['name', 'email', 'password']);
//   var user = new User(body);
//
//   user.save().then((user) => {
//     return user.generateAuthToken();
//   }).then((token) => {
//     res.redirect('/dashboard.html');
//   }).catch((e) => {
//     res.status(400).send(e);
//   })
// });
//
// app.post("/user/login", (req, res) => {
//   var body = _.pick(req.body, ['email', 'password']);
//
//   User.findByCredentials(body.email, body.password).then((user) => {
//     return user.generateAuthToken().then((token) => {
//       res.redirect('/dashboard.html');
//     });
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });
//
// app.get("/user/logout", authenticate, (req, res) => {
//   req.user.removeToken(req.token).then(() =>{
//     res.redirect('/index.html');
//   }, () => {
//     res.status(400).send();
//   });
// });
//
// app.post("/user/profileupdate", (req, res) => {
//   console.log(req.token);
//   // var id = res.id;
//   // console.log(id);
//   // var body = _.pick(req.body, ['address', 'city', 'postalcode']);
//   // if(!ObjectID.isValid(id)) {
//   //   return res.status(404).send();
//   // }
//
// //   User.findByTokenAndUpdate(req.token, {$set: body}).then((user) => {
// //     if(!user){
// //       return res.status(404).send();
// //     }
// //   }).catch((e) => {
// //     res.status(400).send();
// //   })
// });

// app.post("/payment", (req, res) => {
//   instance.orders.create({amount: req.body.amount, currency: 'INR', receipt: 'abc123', payment_capture: false, notes: {'order': 'amount'}}).then((response) => {
//     console.log(response);
//   }).catch((error) => {
//     console.log(error);
//   })
// });
//
// server.listen(port, () => {
//   console.log(`server is up on ${port}`);
// });
