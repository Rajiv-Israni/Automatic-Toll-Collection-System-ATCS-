var socket = io();

jQuery('#form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('registerUser', {
    email: jQuery('[name=email]'),
    password: jQuery('[]')
  })
});
