var app = require('./config/express')();

// Main Page
var common = require('./routes/common.js')();
app.use('/', common);

// router connect
var auth = require('./routes/auth.js')();
app.use('/auth', auth);

// port listening
app.listen(3000, function() {
  console.log('connected, 3000 port!');
});
