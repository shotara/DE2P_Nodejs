var conn = require('../config/db')();

var Auth = new conn({tableName:"deep_member"});

  // Auth.query("SELECT * FROM deep_member", function(err, rows, fields) {
  //
  // });
  //
  // Auth.find('all', {where: "deepMemberNo > 0"}, function(err, rows, fields) {
  //
  //   console.log("2");
  //   console.log(rows);
  // });
  //


exports.checkMember = function(map) {

  Auth.find('count', {where: "deepMemberName="+map.inputMemberEmail}, function(err, rows, fields) {

    console.log("2");
    console.log(rows);
  });

}
