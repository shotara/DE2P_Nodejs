var crypto = require('crypto');

exports.encrypt = function(key, input) {

  var cipher = crypto.createCipher('aes256', key);    // Cipher 객체 생성
  cipher.update(input, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
  var cipheredOutput = cipher.final('base64');        // 암호화된 결과 값

  return cipheredOutput;
}

exports.decrypt = function(key, input) {

  var decipher = crypto.createDecipher('aes256', key); // Decipher 객체 생성
  decipher.update(input, 'base64', 'utf8');   // 인코딩 방식에 따라 복호화
  var decipheredOutput = decipher.final('utf8');       // 복호화된 결과 값

  return decipheredOutput;
}
