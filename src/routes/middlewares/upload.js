const multer = require('multer');
const path = require('path');

// Configuración de Multer para almacenar las imágenes en la carpeta 'public/images/users'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images/users')); // Ruta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // Extraer la extensión del archivo
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Nombre del archivo con sufijo único
  }
});

// Filtrar los archivos permitidos, solo imágenes (jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Solo se permiten imágenes en formato jpg, jpeg o png.');
  }
};

// Middleware de Multer con el límite de tamaño (opcional)
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Límite de 5MB
  fileFilter: fileFilter
});

module.exports = upload;
