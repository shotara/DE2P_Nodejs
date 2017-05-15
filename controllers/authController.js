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

    model.checkMember(map, req, res);
  });
}

exports.join = function(req, res) {
  var opts = {
    password : req.body.password,
    salt : key.keySalt()
  }

  hasher(opts, function(err, pass, salt, hash) {
    var map = {
      inputMemberStatus : 1,
      inputMemberLevel : 1,
      inputMemberCreateDate : (new Date).getTime()/1000,
      inputMemberEmail : crypto.encrypt(key.keyAes(),req.body.inputMemberEmail),
      inputMemberName : crypto.encrypt(key.keyAes(),req.body.inputMemberName),
      inputMemberPassword : hash,
      inputMemberImage : -1
    };

    model.joinMember(map, req, res);
  });
}
