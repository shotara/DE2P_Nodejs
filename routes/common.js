module.exports = function() {
  var route = require('express').Router();

  // main method
  route.get('/', function(req,res) {
    res.send("DE2P, the technical blog.");
  });

  return route;
}
