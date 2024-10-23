const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin-controller');

// Ruta para verificar usuarios administradores
router.get('/', adminController.checkUsuarios);

// Middleware para manejar errores 404 (Ruta no encontrada)
router.use((req, res, next) => {
  res.status(404).json({ mensaje: 'No se ha encontrado la ruta en Admin' });
});

// Middleware para manejar errores generales del servidor (500)
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error en el servidor' });
});

module.exports = router;
