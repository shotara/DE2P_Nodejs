module.exports = function() {
  var route = require('express').Router();

  // main method
  route.get('/', function(req,res) {
    res.render('page/jade/common/index');
  });

  return route;
}
