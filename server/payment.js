var Razorpay = require('razorpay');

var instance = new Razorpay({
  key_id: 'rzp_test_IkoTi6kkz2CaLD',
  key_secret: 'Sw978YGQEUfyg5mKWcp3nwRW'
});

instance.payments.all({
  from: '2016-08-01',
  to: '2016-08-20'
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
})
