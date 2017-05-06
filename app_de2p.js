var app = require('./config/express')();
var conn = require('./config/db')();


// router connect

// Main Page
var common = require('./routes/common.js')(app);
app.use('/', common);

// Auth Page
var auth = require('./routes/auth.js')();
app.use('/auth', auth);

// Feed Page
var feed = require('./routes/feed.js')();
app.use('/feed', feed);

// ckeditor Test
var editor = require('./routes/editor.js')();
app.use('/editor', editor);

// port listening
app.listen(3000, function() {
  console.log('connected, 3000 port!');
});
