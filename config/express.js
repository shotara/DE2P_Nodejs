module.exports = function() {
  var express = require('express');
  var bodyParser = require('body-parser');

  var app = express();
  app.set('views', './views');
  app.set('view engine', 'jade');
  app.use(bodyParser.urlencoded({ extended: false }));

  return app;
}
