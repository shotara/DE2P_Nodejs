exports.getMember = function(type) {
  var sql ="";
  switch(type) {
    case 1:
      sql = 'SELECT * FROM deep_member WHERE deepMemberEmail=? AND deepMemberPassword=? AND deepMemberStatus=1';
      break;
    case 2:
      sql = 'SELECT * FROM deep_member WHERE deepMemberNo=?';
      break;
  }

  return sql;
}

exports.getMemberUid = function() {
  var sql = 'SELECT * FROM deep_member_uid WHERE deepMemberNo=?';
  return sql;
}

exports.checkMember = function() {
  var sql = 'SELECT count(*) as result FROM deep_member WHERE deepMemberEmail=? OR deepMemberName=?';
  return sql;
}

exports.addMember = function() {
  var sql = `
    INSERT INTO deep_member(deepMemberStatus, deepMemberLevel, deepMemberCreateDate, deepMemberEmail, deepMemberName, deepMemberPassword, deepMemberImage)
    VALUES(?, ?, ?, ?, ?, ?, ?)
  `;
  return sql;
}

exports.addMemberUid = function() {
  var sql = `
    INSERT INTO deep_member_uid(deepMemberNo, deepMemberUid)
    VALUES((SELECT deepMemberNo FROM deep_member WHERE deepMemberEmail=?), ?)
  `;
  return sql;
}

exports.setMemberUid = function() {
  var sql = `
    UPDATE deep_member
    SET deepMemberMajor=?, deepMemberCareer=?, deepMemberEmail=?, deepMemberName=?
    WHERE deepMemberNo=? AND deepMemberPassword=?
  `;
  return sql;
}
