var model = require('../models/authModel');
var pbkfd2Password = require('pbkdf2-password');
var hasher = pbkfd2Password();
var key = require('../config/key.js');
var crypto = require('../config/crypto.js');
var common = require('./commonController.js');

exports.login = function(req, res) {

  var checkParam = [
    req.body.password,
    req.body.inputMemberEmail
  ]

  if(common.parameterCheck(checkParam) == true) {
    var opts = {
      password : common.serversideXSS(req.body.password),
      salt : key.keySalt()
    }

    hasher(opts, function(err, pass, salt, hash) {
      var map = {
        inputMemberEmail : crypto.encrypt(key.keyAes(),common.serversideXSS(req.body.inputMemberEmail)),
        inputMemberPassword : hash
        };

      model.loginMember(map, req, res);
    });
  } else {
    console.log('Parameter ERROR');
    res.send("입력이잘못됌요");
  }
}

exports.join = function(req, res) {

  var checkParam = [
    req.body.password,
    req.body.inputMemberEmail,
    req.body.inputMemberName
  ]

  if(common.parameterCheck(checkParam) == true) {
    var opts = {
      password : common.serversideXSS(req.body.password),
      salt : key.keySalt()
    }

    hasher(opts, function(err, pass, salt, hash) {
      var memberCreateDate = (new Date).getTime()/1000;
      var memberEmail = crypto.encrypt(key.keyAes(),common.serversideXSS(req.body.inputMemberEmail));
      var memberName = crypto.encrypt(key.keyAes(),common.serversideXSS(req.body.inputMemberName));

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
  } else {
    console.log('Parameter ERROR');
    res.send("입력이잘못됌요");
  }
}

exports.logout = function(req, res) {
  req.session.destroy(function(err){
    res.redirect('/auth/login');
   });
}

createMemberUid = function(a, b, c) {
  return  String(a).substring(0,6) + String(b).substring(0,6) + String(c).substring(0,4);
}

exports.getProfile = function(req, res) {
  sessionMemberNo = req.session.deepMemberNo;

  if(sessionMemberNo>0) { // 회원인지 확인.
    map = {
      inputMemberNo : sessionMemberNo
    }
    model.getProfile(map, req, res);
  } else {
    console.log('No Member');
    res.send("회원이아니다");
  }
}

exports.setProfile = function(req, res) {

  var checkParam = [
    req.body.password,
    req.body.inputMemberEmail,
    req.body.inputMemberName,
  ]

  if(!(req.session.deepMemberNo >0)) {
    console.log('No Member');
    res.send('noLogin');
  }
  if(common.parameterCheck(map) == true) {
    var opts = {
      password : common.serversideXSS(req.body.password),
      salt : key.keySalt()
    }

    hasher(opts, function(err, pass, salt, hash) {
      var memberMajor = crypto.encrypt(key.keyAes(),common.serversideXSS(req.body.inputMemberMajor));
      var memberCareer = crypto.encrypt(key.keyAes(),common.serversideXSS(req.body.inputMemberCarerr));
      var memberEmail = crypto.encrypt(key.keyAes(),common.serversideXSS(req.body.inputMemberEmail));
      var memberName = crypto.encrypt(key.keyAes(),common.serversideXSS(req.body.inputMemberName));

      var map = {
        inputMemberNo : req.session.deepMemberNo,
        inputMemberMajor : memberMajor,
        inputMemberCareer : memberCareer,
        inputMemberEmail : memberEmail,
        inputMemberName : memberName,
        inputMemberPassword : hash,
      };

      model.setMember(map, req, res);
    });
  } else {
    console.log('Parameter ERROR');
    res.send("입력이잘못됌요");
  }

}
