var conn = require('../config/db')();
var async = require('async');
var feed = require('../config/sql/feed.js');
var key = require('../config/key.js');

exports.addFeed = function(map, req, res) {

  async.waterfall([ // 순차적 실행
    function(callback) {
      conn.beginTransaction(function(err) {
        if(err) {
          console.log(err);
          callback(err, '-2');
        }

        var sql = feed.addFeed(map.mode);
        var param = [
          map.inputMemberNo,
          map.inputCategoryNo,
          map.inputFeedStatus,
          map.inputFeedType,
          map.inputFeedCreateDate,
          map.inputFeedTitle,
          map.inputFeedImages,
          map.inputFeedContent
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
        if(map.isSeries==1) {
          conn.beginTransaction(function(err) {
            if(err) {
              console.log(err);
              callback(err, '-2');
            }

            var sql = feed.getFeedReadyLastInsertKey(map.mode);

            conn.query(sql, function(err, result, feilds) {
              if(err) {
                conn.rollback(function() {
                  console.log(err);
                  callback(err, '-2');
                });
              };

              var sql = feed.addFeedSeries(map.mode);
              var param = [
                result[0].countMax,
                map.inputMemberNo,
                map.inputFeedStatus,
                map.inputFeedSeriesId,
                map.inputFeedSeriesOrder,
                map.inputFeedCreateDate,
                map.inputFeedSeriesName
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
          });
        } else {
          callback(null, data);
        }
      }
    }
  ],function(err, result) {
    if(result == 1) {
      res.send('피드 작성 성공!');
    } else {
      res.send('알수없는 문제가 발생하였습니다.');
    }
  });
}
