module.exports = function() {
  var route = require('express').Router();
  var memberController = require('../controllers/authController.js');

  // login method
  route.get('/login', function(req,res) {

    if(req.session.deepMemberNo == null) {
      var output = `
      <h1>Login</h1>
      <form action="/auth/login" method="post">
        <p>
          <input type="text" name="inputMemberEmail" placeholder="email">
        </p>
        <p>
          <input type="password" name="password" placeholder="password">
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `;
    } else {
      var output = `
      <h1>Hello, ${req.session.deepMemberNo}</h1>
      <a href="/auth/logout">logout</a>`;
    }
    res.send(output);
  });

  route.post('/login', function(req,res) {
    memberController.login(req,res);
  });

  // join method
  route.get('/join', function(req,res) {
    var output = `
    <h1>Login</h1>
    <form action="/auth/join" method="post">
      <p>
        <input type="text" name="inputMemberEmail" placeholder="email">
      </p>
      <p>
        <input type="text" name="inputMemberName" placeholder="nickname">
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

  route.post('/join', function(req,res) {
    memberController.join(req,res);
  });

  route.get('/logout', function(req,res) {
    memberController.logout(req,res);
  });

  return route;
}
