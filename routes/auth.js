module.exports = function() {
  var route = require('express').Router();
  var bkfd2Password = require('pbkdf2-password');
  var hasher = bkfd2Password();

  // login method
  route.get('/login', function(req,res) {
    res.render('page/auth/login');

    var model = require('../models/authModel')();
  });

  // join method
  route.get('/join', function(req,res) {
    res.send("join page");
  });

  return route;
}
