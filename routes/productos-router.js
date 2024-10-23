const express = require('express');
const productosController = require('../controller/produtos-controller');

const router = express.Router();

router.get('/', productosController.getProductos);
router.get('/latest', productosController.getLatestProductos);
router.post('/', productosController.crearProducto);
router.delete('/', productosController.borrarProducto);
router.get('/:id', productosController.obtenerProductoPorId);
router.put('/:id', productosController.actualizarProducto);

// Middleware para manejar errores 404 (Ruta no encontrada)
router.use((req, res, next) => {
  res.status(404).json({ mensaje: 'No se ha encontrado la ruta en Productos' });
});

// Middleware para manejar errores generales del servidor (500)
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error en el servidor' });
});

module.exports = router;
