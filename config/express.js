module.exports = function() {
  var express = require('express');
  var bodyParser = require('body-parser');
  var engine = require('ejs');
  var app = express();

  app.engine('html', require('ejs').renderFile);
  app.set('views', './views');
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/editor/test', express.static(__dirname + "/../views/editor"));
  app.use('/css', express.static(__dirname + "/../views/css"));
  app.use('/js', express.static(__dirname + "/../views/js"));

  return app;
}
