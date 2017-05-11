var conn = require('../config/db')();

var Auth = new conn({tableName:"deep_member"});

exports.checkMember = function(map,req,res) {
  var check;

  Auth.find('count', {where: "deepMemberEmail="+map.inputMemberEmail+" AND deepMemberPassword='"+map.inputMemberPassword+"'"}, function(err, result) {
    if(err) check = '-1';
    check = 1;
    console.log(check);

    return check;
  });
}
