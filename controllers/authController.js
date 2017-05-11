var model = require('../models/authModel');
var pbkfd2Password = require('pbkdf2-password');
var hasher = pbkfd2Password();

exports.login = function(req, res) {
  var map;
  var check;
  var opts = {
    password : req.body.password,
    salt : 'qnKmu3nkYYgoocNil6mVE+CW835l/8xUIx4tRLNgN03iTiXCeVI5/LyL7lmFBPQHflrvxg+3YhbvCt0nK5Vgpw=='
  }

  hasher(opts, function(err, pass, salt, hash) {
    map = {
      inputMemberEmail : "'2My+x+DprgD+mmmngY6lOpWmjTE5X9WWxcSmZuh33Gs='",
      inputMemberPassword : hash
    };

    check = checkMember.sync(map);

    console.log(check);

  });
}
