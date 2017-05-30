exports.addUpload = function() {
  var sql =`
    INSERT INTO deep_upload(deepMemberNo, deepUploadCategory, deepUploadStatus, deepUploadThumbnail, deepUploadCreateDate, deepUploadDeleteDate, deepUploadFileSize, deepUploadFileExtension, deepUploadOriginalFileName, deepUploadEncryptFileName)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  return sql;
}

exports.getUploadLastInsertKey = function() {
  var sql ='SELECT max(deepUploadNo) as countMax FROM deep_upload';

  return sql;
}

exports.getUpload = function() {
  var sql ='SELECT * FROM deep_upload WHERE deepUploadNo = ?';

  return sql;
}
