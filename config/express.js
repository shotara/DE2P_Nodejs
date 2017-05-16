module.exports = function() {
  var express = require('express');
  var bodyParser = require('body-parser');
  var engine = require('ejs');
  var session = require('express-session');
  var key = require('./key.js');
  var app = express();

  // app 연동
  app.engine('html', require('ejs').renderFile);
  app.set('views', './views');
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({
    secret : key.keySession(),
    resave : false,
    saveUninitialized : true
    //store:??
  }));

  // static  페이지 연동
  app.use('/editor/test', express.static(__dirname + "/../views/editor"));
  app.use('/page', express.static(__dirname + "/../views/page"));
  app.use('/css', express.static(__dirname + "/../views/css"));
  app.use('/js', express.static(__dirname + "/../views/js"));

  return app;
}
