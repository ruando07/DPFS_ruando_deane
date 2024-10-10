const express = require('express');
const router = express.Router();
const db = require('../models'); // Asegúrate de apuntar al archivo correcto

// Endpoint para listar todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await db.User.findAll(); // Ajusta según el nombre de tu modelo
        res.json({
            count: users.length,
            users: users.map(user => ({
                id: user.id,
                name: user.firstName + ' ' + user.lastName,
                email: user.email,
                detail: `/api/users/${user.id}` // Ruta de detalle del usuario
            }))
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Endpoint para el detalle de un usuario
router.get('/:id', async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileImage: `/images/users/${user.profileImage}` // Ajusta según tu estructura
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

module.exports = router;
