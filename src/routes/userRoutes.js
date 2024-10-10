const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Verifica que esté correctamente importado
const upload = require('./middlewares/multerConfig');
const authMiddleware = require('./middlewares/authmiddleware');
const { body } = require('express-validator');

// Validaciones para el registro de usuarios
const validateRegister = [
  body('firstName').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('lastName').notEmpty().withMessage('El apellido es obligatorio').isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  body('email').isEmail().withMessage('Debe ingresar un email válido'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
];

// Rutas de usuario
router.get('/register', userController.registerForm); // Aquí se asegura que userController tiene una función registerForm
router.post('/register', upload.single('profileImage'), validateRegister, userController.register); // Verifica que userController.register esté definido

router.get('/login', userController.loginForm); // Asegúrate de que userController.loginForm esté bien definido
router.post('/login', userController.login); // Asegúrate de que userController.login esté bien definido

router.get('/logout', userController.logout); // Revisa que el método logout esté definido
router.get('/profile', authMiddleware, userController.profile); // Revisa que el método profile esté correctamente implementado

module.exports = router;
