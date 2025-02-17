var uploadModel = require('../models/uploadModel');
var key = require('../config/key.js');

exports.uploadImage = function(req, res, map) {

  var map2 = {
    inputMemberNo : map.memberNo,
    inputUploadCategory : map.uploadCategory,
    inputUploadStatus : map.uploadStatus,
    inputUploadThumbnail : map.uploadThumbnail,
    inputUploadCreateDate : map.uploadCreateDate,
    inputUploadDeleteDate : 0,
    inputUploadFileSize : map.uploadFileSize,
    inputUploadFileExtension : map.uploadFileExtension,
    inputUploadOriginalName : map.uploadOriginalName,
    inputUploadEncryptFileName : map.uploadEncryptFileName
  }

  uploadModel.addUpload(map2, req, res);

}

exports.getAWSKeyName = function(mode, map) {
  var url = '';
  switch(mode) {
    case 1:
      url = key.AWS_S3_USER_BUCKET_URL() + '/member/' + map.deepMemberUid + '/';
      break;
    default:
    return -1;
  }

  return url;
}
