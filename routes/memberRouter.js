module.exports = function() {
  var route = require('express').Router();
  var memberController = require('../controllers/memberController.js');

  // login method
  route.get('/login', function(req,res) {

    if(req.session.deepMemberNo == null) {
      var output = `
      <h1>Login</h1>
      <form action="/member/login" method="post">
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
      <a href="/member/logout">logout</a>

      <a href="/member/modify"><h1>수정</h1></a>
      <img src="${req.session.deepMemberImage}" width="300" height="400">
      `;

    }
    res.send(output);
  });

  route.post('/login', function(req,res) {
    memberController.login(req,res);
  });

  // join method
  route.get('/join', function(req,res) {
    var output = `
    <h1>Join</h1>
    <form action="/member/join" method="post">
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

  // logout
  route.get('/logout', function(req,res) {
    memberController.logout(req,res);
  });

  // modify method
  route.get('/modify', function(req,res) {
    memberController.getProfile(req,res);
  });

  route.post('/modify', function(req,res) {
    memberController.setProfile(req,res);
  });

  return route;
}
