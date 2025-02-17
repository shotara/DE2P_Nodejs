var conn = require('../config/db')();
var crypto = require('../config/crypto.js');
var async = require('async');
var member = require('../config/sql/member.js');
var upload = require('../config/sql/upload.js');
var key = require('../config/key.js');
var commonController = require('../controllers/commonController.js');
var uploadController = require('../controllers/uploadController.js');

exports.loginMember = function(map,req,res) {

  async.waterfall([ // 순차적 실행
    function(callback) {
      var sql = member.getMember(3);
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

        if(result[0] != null) {
          callback(null, result[0]);
        } else {
          callback(null, '-2'); // 다음 waterfall로 이동
        }
      });
    },
    function(data, callback) {   // memberUid 추가
      if(data != '-2') {
        if(data.deepMemberImage != -1) {
          var sql = upload.getUpload();
          var param = [
            data.deepMemberImage,
          ]

          conn.query(sql, param, function(err, result, feilds) {
            if(err) {
              console.log(err);
              callback(err, '-2');
            };

            if(result[0]!=null) {
              // session register
              var uploadMap = {
                deepMemberUid : data.deepMemberUid
              }

              var map = {
                sessionMemberNo : data.deepMemberNo,
                sessionMemberLevel : data.deepMemberLevel,
                sessionMemberImage : uploadController.getAWSKeyName(1, uploadMap) + result[0].deepUploadEncryptFileName,
                sessionMemberUid : data.deepMemberUid
              }
              commonController.saveSession(map, req, res);

              callback(null, '1');
            } else {
              callback(null, '-2'); // 다음 waterfall로 이동
            }
          });
        } else {
          var map = {
            sessionMemberNo : data.deepMemberNo,
            sessionMemberLevel : data.deepMemberLevel,
            sessionMemberImage : data.deepMemberImage,
            sessionMemberUid : data.deepMemberUid
          }
          commonController.saveSession(map, req, res);

          callback(null, '1');
        }
      } else {
        callback(null, data);
      }
    }
  ],function(err, result) {
    if(result == 1) {
      req.session.save(function(){
        res.redirect('/member/login');
      });
    } else {
      res.send('알수없는 문제가 발생하였습니다.');
    }
  });
}

exports.joinMember = function(map, req, res) {

  async.waterfall([ // 순차적 실행
    function(callback) {
      var sql = member.checkMember();
      var param = [
        map.inputMemberEmail,
        map.inputMemberName
      ]

      conn.query(sql, param, function(err, result, feilds) {
        if(err) {
          console.log(err);
          callback(err, '-2');
        };

        if(result[0].result > 0) {
          //'이미 있는 아이디or닉네임'
          callback(null, '-1');
        } else {
          callback(null, '1'); // 다음 waterfall로 이동
        }
      });
    },
    function(data, callback) {
      if(data == 1) {
        conn.beginTransaction(function(err) {
          if(err) {
            console.log(err);
            callback(err, '-2');
          }

          var sql = member.addMember();
          var param = [
            map.inputMemberStatus,
            map.inputMemberLevel,
            map.inputMemberCreateDate,
            map.inputMemberMajor,
            map.inputMemberCareer,
            map.inputMemberEmail,
            map.inputMemberName,
            map.inputMemberPassword,
            map.inputMemberImage
          ]

          conn.query(sql, param, function(err, result, feilds) {
            if(err) {
              conn.rollback(function() {
                console.log(err);
                callback(err, '-2');
              });
            };

            // 성공했을 때
            conn.commit(function(err) {
              if(err) {
                conn.rollback(function() {
                  console.log(err);
                  callback(err, '-2');
                });
              }
              if(result.affectedRows==1) {
                callback(null, '1');
              } else {
                callback(err, '-2');
              }
            });
          });
        });
      } else {
        callback(null, data);
      }
    },
    function(data, callback) {   // memberUid 추가
      if(data == 1) {
        var sql = member.addMemberUid();
        var param = [
          map.inputMemberEmail,
          map.inputMemberUid
        ]

        conn.query(sql, param, function(err, result, feilds) {
          if(err) {
            console.log(err);
            callback(err, '-2');
          };

          if(result.affectedRows==1) {
            // 추가완료
            callback(null, '1');
          } else {
            callback(null, '-2'); // 다음 waterfall로 이동
          }
        });
      } else {
        callback(null, data);
      }
    }
  ],function(err, result) {
    if(result == 1) {
      res.send('회원가입 성공!');
    } else if(result == -1) {
      res.send('이미 있는 아이디or닉네임');
    } else if(err || result == -2) {
      res.send('알수없는 문제가 발생하였습니다.');
    }
  });
}



exports.getProfile = function(map, req, res) {

  async.waterfall([ // 순차적 실행
    function(callback) {
      var sql = member.getMember(2);
      var param = [
        map.inputMemberNo
      ]

      conn.query(sql, param, function(err, result, feilds) {
        if(err) {
          console.log(err);
          callback(err, '-2');
        };
        callback(null, result);
      });
    },
    function(data, callback) {
      //추가기능
      callback(null, data);
    }
  ],function(err, result) {
    if(err || result == -2) {
      res.send('알수없는 문제가 발생하였습니다.');
    } else {
      var output = `
        <h1>Modify</h1>
        <form action="/member/modify" method="post">
          <p>
            Mail
            <input type="text" name="inputMemberEmail" value="`+crypto.decrypt(key.keyAes(),result[0].deepMemberEmail)+`">
          </p>
          <p>
            Name
            <input type="text" name="inputMemberName" value="`+crypto.decrypt(key.keyAes(),result[0].deepMemberName)+`">
          </p>
          <p>
            Major
            <input type="text" name="inputMemberMajor" value="`+crypto.decrypt(key.keyAes(),result[0].deepMemberMajor)+`">
          </p>
          <p>
            Career
            <input type="text" name="inputMemberCareer" value="`+crypto.decrypt(key.keyAes(),result[0].deepMemberCareer)+`">
          </p>
          <p>
            Password
            <input type="password" name="password" placeholder="password">
          </p>
          <p>
            <input type="submit">
          </p>
        </form>

        <form action="/upload/memberImg" method='post' enctype="multipart/form-data">
          <input type='file' name='img'>
          <input type='submit' value="완료">
        </form>
      `;
      res.send(output);
    }
  });
}

exports.setMember = function(map, req, res) {

  async.waterfall([ // 순차적 실행
    function(callback) {
      conn.beginTransaction(function(err) {
        if(err) {
          console.log(err);
          callback(err, '-2');
        }

        var sql = member.setMember(1);
        var param = [
          map.inputMemberMajor,
          map.inputMemberCareer,
          map.inputMemberName,
          map.inputMemberNo,
          map.inputMemberPassword
        ]

        conn.query(sql, param, function(err, result, feilds) {
          if(err) {
            conn.rollback(function() {
              console.log(err);
              callback(err, '-2');
            });
          };

          // 성공했을 때
          conn.commit(function(err) {
            if(err) {
              conn.rollback(function() {
                console.log(err);
                callback(err, '-2');
              });
            }
            if(result.affectedRows==1) {
              callback(null, '1');
            } else {
              callback(err, '-2');
            }
          });
        });
      });
    }
  ],function(err, result) {
    if(result == 1) {
      res.send('회원정보 수정 완료!');
    } else if(result == -1) {
      res.send('이미 있는 아이디or닉네임');
    } else if(err || result == -2) {
      res.send('알수없는 문제가 발생하였습니다.');
    }
  });
}
