module.exports = function() {
  var route = require('express').Router();
  var memberController = require('../controllers/authController.js');

  // login method
  route.get('/login', function(req,res) {
    var output = `
    <h1>Login</h1>
    <form action="/auth/login" method="post">
      <p>
        <input type="text" name="username" placeholder="username">
      </p>
      <p>
        <input type="password" name="password" placeholder="password">
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
    `;
    res.send(output);
  });

  route.post('/login', function(req,res) {
    memberController.login(req,res);
  })

  // join method
  route.get('/join', function(req,res) {
    res.send("join page");
  });

  return route;
}
