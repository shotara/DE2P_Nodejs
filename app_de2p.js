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
app.get('/editor/ckeditor', function(rep,res) {
  res.render('editor/ckeditor_4.6.2_full_codemirror/ckeditor/samples/index');
});

// codemirror Test
app.get('/editor/codemirror', function(rep,res) {
  res.render('editor/ckeditor_4.6.2_full_codemirror/ckeditor/plugins/codemirror-5.23.0/mode/clike/index');
});

// port listening
app.listen(3000, function() {
  console.log('connected, 3000 port!');
});
