module.exports = function() {
  var route = require('express').Router();

  // app.use('/', express.static(__dirname + "/page/html/index.html"));

  // main method
  route.get('/', function(req,res) {
    res.render('page/index');
  });

  return route;
}
