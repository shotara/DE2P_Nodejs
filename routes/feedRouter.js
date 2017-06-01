module.exports = function() {
  var route = require('express').Router();

  // write method
  route.get('/writeFeed', function(req,res) {
    res.render('page/feed/write');
  });

  // set method
  route.get('/getFeed', function(req,res) {
    res.send("Get Feed");
  });

  // set method
  route.get('/setFeed', function(req,res) {
    res.send("Set Feed");
  });

  // delete method
  route.get('/deleteFeed', function(req,res) {
    res.send("Delete Feed");
  });

  // list method
  route.get('/listFeed', function(req,res) {
    res.send("List Feed");
  });

  // search method
  route.get('/searchFeed', function(req,res) {
    res.send("Search Feed");
  });

  return route;
}
