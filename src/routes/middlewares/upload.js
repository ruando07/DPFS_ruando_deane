const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images/users')); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); 
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); 
  }
});


const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Solo están permitidos los formatos jpg, jpeg y png.');
  }
};


const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, 
  fileFilter: fileFilter
});

module.exports = upload;
