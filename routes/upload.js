var aws = require('aws-sdk');
var multer = require('multer');
// var memorystorage = multer.memoryStorage();
var upload = multer({ dest: '../views/temp/' });
// var upload = multer({ storage: memorystorage });
var key = require('../config/key.js');

module.exports = function() {
  var route = require('express').Router();

  // s3 upload
  route.post('/memberImg', upload.array('img'), function (req, res, next) {
    req.files.forEach(function (fileObj, index) {
      //라우터에 Multer 객체를 연결하면 input name이 일치하는 파일 데이터를 자동으로 받아서 req.files를 통해 접근할 수 있게 처리해 줍니다.
      //메모리 버퍼에 저장하는 형태를 선택했으므로 fileObj는 다음과 같은 속성을 갖게 됩니다.
      //  fileObj.buffer //예) Buffer 객체
      //  fileObj.originalname //예) abc.jpg
      //  fileObj.mimetype //예)'image/jpeg'

      console.log(fileObj);

      //아마존 S3에 저장하려면 먼저 설정을 업데이트합니다.
      aws.config.region = 'ap-northeast-2'; //ToKyo
      aws.config.update({
        accessKeyId: key.AWS_S3_ACCESS_KEY_ID(),
        secretAccessKey: key.AWS_S3_SECRET_ACCESS_KEY_ID()
      });

      var s3_params = {
        Bucket: 'deep-test2',
        Key: 'member/' + fileObj.filename,
        ACL: 'public-read',
        ContentType: fileObj.mimetype,
        Body: require('fs').createReadStream(fileObj.path)
      };

      var s3 = new aws.S3();
      s3.upload(s3_params, function(err, data) {
          console.log(err);
          console.log(data);
      })
    })
  });

  return route;
}
