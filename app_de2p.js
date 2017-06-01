var app = require('./config/express')();

// router connect

// Main Page
var commonRouter = require('./routes/commonRouter.js')();
app.use('/', commonRouter);

// Member Page
var memberRouter = require('./routes/memberRouter.js')();
app.use('/member', memberRouter);

// Feed Page
var feedRouter = require('./routes/feedRouter.js')();
app.use('/feed', feedRouter);

// Upload
var uploadRouter = require('./routes/uploadRouter.js')();
app.use('/upload', uploadRouter);

// ckeditor Test
var editor = require('./routes/editor.js')();
app.use('/editor', editor);

// port listening
app.listen(3000, function() {
  console.log('connected, 3000 port!');
});
