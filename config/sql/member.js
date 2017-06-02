exports.getMember = function(type) {
  var sql ="";
  switch(type) {
    case 1:
      sql = 'SELECT * FROM deep_member WHERE deepMemberEmail=? AND deepMemberPassword=? AND deepMemberStatus=1';
      break;
    case 2:
      sql = 'SELECT * FROM deep_member WHERE deepMemberNo=?';
      break;
    case 3:
      sql = 'SELECT dm.* , dmu.deepMemberUid as deepMemberUid FROM deep_member dm, deep_member_uid dmu WHERE dm.deepMemberEmail=? AND dm.deepMemberPassword=? AND dm.deepMemberStatus=1 AND dm.deepMemberNo=dmu.deepMemberNo';
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
    INSERT INTO deep_member(deepMemberStatus, deepMemberLevel, deepMemberCreateDate, deepMemberMajor, deepMembercareer, deepMemberEmail, deepMemberName, deepMemberPassword, deepMemberImage)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
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

exports.setMember = function(type) {
  var sql='';
  switch (type) {
    case 1: sql = `
              UPDATE deep_member
              SET deepMemberMajor=?, deepMemberCareer=?, deepMemberName=?
              WHERE deepMemberNo=? AND deepMemberPassword=?
              `;
      return  sql;
    case 2: sql = `
              UPDATE deep_member
              SET deepMemberMajor=?, deepMemberCareer=?, deepMemberName=?, deepMemberPassword=?
              WHERE deepMemberNo=? AND deepMemberPassword=?
              `;
      return  sql;
    case 3: sql = `
              UPDATE deep_member
              SET deepMemberImage=?
              WHERE deepMemberNo=?
              `;
      return sql;

    default:
      return '';
  }
}
