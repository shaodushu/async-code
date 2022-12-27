const aesCrypto = require("crypto-js/aes");
const utf8Encode = require("crypto-js/enc-utf8");

const secretKey = "your-secret-key";

// 加密
const encrypt = (text) => {
  let encryptedText = aesCrypto
    .encrypt(utf8Encode.parse(text), secretKey)
    .toString();

  return encryptedText;
};

// 解密
const decrypt = (text) => {
  let decryptText = aesCrypto.decrypt(text, secretKey).toString(utf8Encode);

  console.log(decryptText);

  return decryptText.toString(utf8Encode);
};

// decrypt(encrypt("hello aes!")); // hello aes!
// console.log(encrypt("hello aes!"));
exports.aes = { encrypt, decrypt };
