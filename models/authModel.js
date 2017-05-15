var conn = require('../config/db')();

exports.checkMember = function(map,req,res) {

  var sql = 'SELECT count(*) as result FROM deep_member WHERE deepMemberEmail=? AND deepMemberPassword=?';
  var param = [
    map.inputMemberEmail,
    map.inputMemberPassword
  ]

  conn.query(sql, param, function(err, result, feilds) {
    if(err) {
      console.log(err);
      res.send('알수없는 문제가 발생하였습니다.');
      return;
    };
    if(result[0].result==1) {
      // 세션 등록
      res.send('로그인 성공!');
    } else {

      res.send('로그인 실패!');
    }
  });
}

exports.joinMember = function(map, req, res) {

  var sql = 'SELECT count(*) as result FROM deep_member WHERE deepMemberEmail=? OR deepMemberName=?';
  var param = [
    map.inputMemberEmail,
    map.inputMemberName
  ]

  conn.query(sql, param, function(err, result, feilds) {
    if(err) {
      console.log(err);
      res.send('알수없는 문제가 발생하였습니다.');
      return;
    };

    if(result[0].result > 0) {
      res.send('이미 있는 아이디or닉네임');
      return;
    }

    conn.beginTransaction(function(err) {
      if(err) { throw err; }
      var sql = `
        INSERT INTO deep_member(deepMemberStatus, deepMemberLevel, deepMemberCreateDate, deepMemberEmail, deepMemberName, deepMemberPassword, deepMemberImage)
        VALUES(?, ?, ?, ?, ?, ?, ?)
      `;
      var param = [
        map.inputMemberStatus,
        map.inputMemberLevel,
        map.inputMemberCreateDate,
        map.inputMemberEmail,
        map.inputMemberName,
        map.inputMemberPassword,
        map.inputMemberImage
      ]

      conn.query(sql, param, function(err, result, feilds) {
        if(err) {
          conn.rollback(function() {
            console.log(err);
            res.send('알수없는 문제가 발생하였습니다.');
            return;
          });
        };

        conn.commit(function(err) {
          if(err) {
            conn.rollback(function() {
              console.log(err);
              res.send('알수없는 문제가 발생하였습니다.');
              return;
            });
          }
          if(result.affectedRows==1) {
            // 세션 등록
            res.send('회원가입 성공!');
          } else {
            res.send('회원가입실패 실패!');
          }
        });
      });
    });
  });
}
