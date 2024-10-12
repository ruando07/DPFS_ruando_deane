const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../../models');

module.exports = {
    // Formulario de registro
    registerForm: (req, res) => {
        res.render('users/register', { errors: [], oldData: {} });
    },

    // Registro de usuario
    register: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/register', {
                errors: errors.array(),
                oldData: req.body
            });
        }

        try {
            const existingUser = await db.User.findOne({ where: { email: req.body.email } });
            if (existingUser) {
                return res.render('users/register', {
                    errors: [{ msg: 'El email ya existe' }],
                    oldData: req.body
                });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                profileImage: req.file ? req.file.filename : 'default.jpg'
            });

            res.redirect('/users/login');
        } catch (error) {
            console.error('Error en el registro:', error);
            res.status(500).send('Error del servidor');
        }
    },

   
    loginForm: (req, res) => {
        res.render('users/login', { errors: [] });
    },

 
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await db.User.findOne({ where: { email } });
            if (!user) {
                return res.render('users/login', { errors: [{ msg: 'información incorrecta' }] });
            }

            const passwordMatches = await bcrypt.compare(password, user.password);
            if (!passwordMatches) {
                return res.render('users/login', { errors: [{ msg: 'Información incorrecta' }] });
            }

            req.session.user = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profileImage: user.profileImage
            };
            res.redirect('/users/profile');
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            res.status(500).send('Error en el servidor');
        }
    },

    // Cerrar sesión
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },

    // Perfil de usuario
    profile: (req, res) => {
        if (!req.session.user) {
            return res.redirect('/users/login');
        }

        res.render('users/profile', { user: req.session.user });
    }
};
