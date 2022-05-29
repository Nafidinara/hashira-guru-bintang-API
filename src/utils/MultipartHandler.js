const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dirPath = 'src/public/assets/storage/';

const storage = (path) => {
  return multer.diskStorage({
    destination: function (req, file, callback) {
      if (!fs.existsSync(dirPath + path)){
        fs.mkdirSync(dirPath + path, { recursive: true });
      }
      callback(null, dirPath + path);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        new Date().valueOf() +
        '_' +
        file.originalname
      );
    }
  });
}

function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb(new Error('Error: Images Only [ jpeg|jpg|png|gif ]!'));
  }
}

module.exports.upload = (path) => {
  return multer({
    storage : storage(path),
    limits: { fileSize: 2000000 },
    fileFilter: function(_req, file, cb){
      checkFileType(file, cb);
    }
  });
}
