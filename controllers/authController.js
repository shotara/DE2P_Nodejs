var model = require('../models/authModel');
var pbkfd2Password = require('pbkdf2-password');
var hasher = pbkfd2Password();
var key = require('../config/key.js');
var crypto = require('../config/crypto.js');

exports.login = function(req, res) {
  var opts = {
    password : req.body.password,
    salt : key.keySalt()
  }
  hasher(opts, function(err, pass, salt, hash) {
    var map = {
      inputMemberEmail : crypto.encrypt(key.keyAes(),req.body.inputMemberEmail),
      inputMemberPassword : hash
    };

    model.loginMember(map, req, res);
  });
}

exports.join = function(req, res) {
  var opts = {
    password : req.body.password,
    salt : key.keySalt()
  }

  hasher(opts, function(err, pass, salt, hash) {
    var memberCreateDate = (new Date).getTime()/1000;
    var memberEmail = crypto.encrypt(key.keyAes(),req.body.inputMemberEmail);
    var memberName = crypto.encrypt(key.keyAes(),req.body.inputMemberName);

    var map = {
      inputMemberStatus : 1,
      inputMemberLevel : 1,
      inputMemberCreateDate : memberCreateDate,
      inputMemberEmail : memberEmail,
      inputMemberName : memberName,
      inputMemberPassword : hash,
      inputMemberImage : -1,
      inputMemberUid : createMemberUid(memberEmail,memberName,memberCreateDate)
    };

    model.joinMember(map, req, res);
  });
}

exports.logout = function(req, res) {
  delete req.session;
  res.redirect('/auth/login');
}

createMemberUid = function(a, b, c) {
  return  a.substring(0,6) + b.substring(0,6) + String(c).substring(0,4);
}
