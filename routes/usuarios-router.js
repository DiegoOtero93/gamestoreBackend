const express = require('express');
const router = express.Router();
const usuariosController = require('../controller/usuarios-controller');

// Ruta para registrar un nuevo usuario
router.post('/', usuariosController.registrarUsuario);

// Ruta para iniciar sesión (login)
router.post('/login', usuariosController.loginUsuario);

// Middleware para manejar errores 404 (Ruta no encontrada)
router.use((req, res, next) => {
  res.status(404).json({ mensaje: 'No se ha encontrado la ruta en Usuarios' });
});

// Middleware para manejar errores generales del servidor (500)
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error en el servidor' });
});

module.exports = router;
