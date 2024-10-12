const express = require('express');
const router = express.Router();

// Simulación de base de datos de usuarios
const users = [
  { id: 1, name: 'Ruando Deane', email: 'rd07@example.com' },
  { id: 2, name: 'Anel castillo', email: 'ac5667@example.com' }
];

// Endpoint para obtener todos los usuarios
router.get('/', (req, res) => {
  res.json({
    count: users.length,
    users: users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      detail: `/api/users/${user.id}`
    }))
  });
});

// Endpoint para obtener el detalle de un usuario por ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json({
    id: user.id,
    name: user.name,
    email: user.email
  });
});

module.exports = router;
