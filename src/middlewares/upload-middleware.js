const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  }
});

console.log("storage = ",storage);
const upload = multer({ storage });
console.log("storage = ",storage);
console.log(upload);
module.exports = {
  uploadmultipleDocuments: upload.array('documents',5)
};