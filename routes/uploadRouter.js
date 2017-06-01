var aws = require('aws-sdk');
var multer = require('multer');
var fs = require('fs');
var crypto = require('../config/crypto.js');
var key = require('../config/key.js');
var uploadController = require('../controllers/uploadController.js');
var commonController = require('../controllers/commonController.js');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'views/temp/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
});
var upload = multer({ storage: storage });
var Thumbnail = require('thumbnail');
var thumbnail = new Thumbnail('./views/temp', './views/temp');

module.exports = function() {
  var route = require('express').Router();

  // s3 upload
  route.post('/memberImg', upload.array('img'), function (req, res, next) {
    req.files.forEach(function (fileObj, index) {
      //라우터에 Multer 객체를 연결하면 input name이 일치하는 파일 데이터를 자동으로 받아서 req.files를 통해 접근할 수 있게 처리해 줍니다.

      thumbnail.ensureThumbnail(fileObj.filename, 400, 400, function (err, filename) {
        // "filename" is the name of the thumb in '/path/to/thumbnails'
        //아마존 S3에 저장하려면 먼저 설정을 업데이트합니다.
        if(err) {
          console.log(err);
        }

        aws.config.region = 'ap-northeast-2'; //ToKyo
        aws.config.update({
          accessKeyId: key.AWS_S3_ACCESS_KEY_ID(),
          secretAccessKey: key.AWS_S3_SECRET_ACCESS_KEY_ID()
        });

        var encryptFile = commonController.checkSpecialPattern(crypto.encrypt(key.keyAes(),fileObj.filename)).substring(0,16);

        var s3_params = {
          Bucket: 'deep-test2',
          Key: 'member/' + req.session.deepMemberUid + '/' + encryptFile,
          ACL: 'public-read',
          ContentType: fileObj.mimetype,
          Body: fs.createReadStream('./'+fileObj.destination+filename)
        };

        var s3 = new aws.S3();
        s3.upload(s3_params, function(err, data) {
          if(err) {
            console.log(err);
          }
          fs.stat('./'+fileObj.destination+filename, function(err, stat) {

            var size = stat.size;
            // 임시파일 삭제
            fs.unlink('./'+fileObj.destination+filename, function (err) { if (err) console.log(err); });
            fs.unlink(fileObj.destination+fileObj.filename, function (err) { if (err) console.log(err); });

            var map = {
              memberNo : req.session.deepMemberNo,
              uploadCategory : 1,
              uploadStatus : 1,
              uploadThumbnail : 1,
              uploadCreateDate : (new Date).getTime()/1000,
              uploadDeleteDate : 0,
              uploadFileSize : stat.size,
              uploadFileExtension : fileObj.mimetype,
              uploadOriginalName : fileObj.filename,
              uploadEncryptFileName : encryptFile
            }

            /// uploadController
            uploadController.uploadImage(req, res, map);
          });
        });
      });
    });
  });

  return route;
}
