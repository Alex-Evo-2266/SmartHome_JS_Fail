const  multer = require ('multer')

module.exports = function (str,format = ".jpg",path = './img/backGroundFon/base') {

  var storage = multer.diskStorage({
          destination: path,
          filename: function (req, file, cb) {
              cb(null, str + format);
          }
      });

  var upload = multer({storage: storage});

      return upload.single(str)
}
