const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const upload = require('./middlewares/multerConfig');
const authMiddleware = require('./middlewares/authmiddleware');
const { body } = require('express-validator');


const validateRegister = [
  body('firstName').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 2 }).withMessage('El nombre debe contener 2 caracteres como minimo'),
  body('lastName').notEmpty().withMessage('El apellido es obligatorio').isLength({ min: 2 }).withMessage('El apellido debe contener 2 caracteres como minimo'),
  body('email').isEmail().withMessage('ingresar un email válido'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe contener 8 caracteres como minimo')
];

router.get('/register', userController.registerForm); 
router.post('/register', upload.single('profileImage'), validateRegister, userController.register); 

router.get('/login', userController.loginForm); 
router.post('/login', userController.login); 

router.get('/logout', userController.logout); 
router.get('/profile', authMiddleware, userController.profile); 

module.exports = router;
