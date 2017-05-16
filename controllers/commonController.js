
exports.saveSession = function(map, req, res) {

  req.session.deepMemberNo = map.sessionMemberNo;
  req.session.deepMemberLevel = map.sessionMemberLevel;
  req.session.deepMemberImage = map.sessionMemberImage;
  // 
  // req.session.save(function(){
  //   return;
  // });
}
