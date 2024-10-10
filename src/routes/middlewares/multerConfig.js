const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users'); // Ruta donde se almacenan las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, 'profileImage-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
