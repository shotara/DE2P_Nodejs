var conn = require('../config/db')();
var common = require('../controllers/commonController.js');
var upload = require('../config/sql/upload.js');
var member = require('../config/sql/member.js');
var key = require('../config/key.js');
var crypto = require('../config/crypto.js');
var async = require('async');

exports.addUpload = function(map, req, res) {

  async.waterfall([ // 순차적 실행
    function(callback) {
      conn.beginTransaction(function(err) {
        if(err) { throw err; }
        var sql = upload.addUpload();
        var param = [
          map.inputMemberNo,
          map.inputUploadCategory,
          map.inputUploadStatus,
          map.inputUploadThumbnail,
          map.inputUploadCreateDate,
          map.inputUploadDeleteDate,
          map.inputUploadFileSize,
          map.inputUploadFileExtension,
          map.inputUploadOriginalName,
          map.inputUploadEncryptFileName
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
    },
    function(data, callback) {
      if(data == 1) {
        var sql = upload.getUploadLastInsertKey();

        conn.query(sql, function(err, result, feilds) {
          if(err) {
            console.log(err);
            callback(err, '-2');
          };

          if(result[0].countMax > 0) {
            callback(null, result[0].countMax);
          } else {
            callback(err, '-2');
          }
        });
      } else {
        callback(err, '-2');
      }
    },
    function(data, callback) {

      if(data > 0) {
        conn.beginTransaction(function(err) {
          if(err) { throw err; }
          var sql = member.setMember(3);
          var param = [
            data,
            map.inputMemberNo
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
        callback(null, '-2');
      }
    }
  ],function(err, result) {
    if(result == 1) {
      var output = `
        <script type="text/javascript">
          alert("업로드 성공!");
          location.href="/auth/login"
        </script>
        `;
      res.send(output);
    } else {
      res.send('알수없는 문제가 발생하였습니다.');
    }
  });
}
