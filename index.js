const express = require('express'); // Importa el módulo Express para la creación de la aplicación web
const path = require('path'); // Importa el módulo Path para la gestión de rutas de archivos
const cors = require('cors'); // Importa el módulo Cors para habilitar CORS en la aplicación
const bunyan = require('bunyan'); // Importa el módulo Bunyan para la creación de registros de actividad
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const productosRouter = require('./routes/productos-router'); // Importa el enrutador de productos desde su archivo correspondiente
const adminRouter = require('./routes/admin-router'); // Importa el enrutador de admin desde su archivo correspondiente
const usuariosRouter = require('./routes/usuarios-router'); // Importa el enrutador de usuarios desde su archivo correspondiente

const app = express(); // Crea una instancia de la aplicación Express

app.use(cors()); // Aplica el middleware Cors para permitir peticiones de dominios diferentes al del servidor
app.use(express.json()); // Middleware para analizar cuerpos de solicitud en formato JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar cuerpos de solicitud codificados en URL
app.use(express.static(path.join(__dirname, 'public'))); // Middleware para servir archivos estáticos desde el directorio 'public'

app.use('/productos', productosRouter); // Asocia el enrutador de productos a la ruta '/productos'
app.use('/admin', adminRouter); // Asocia el enrutador de admin a la ruta '/admin'
app.use('/usuarios', usuariosRouter); // Asocia el enrutador de usuarios a la ruta '/usuarios'

// Ruta de prueba para verificar el despliegue
app.get('/', (req, res, next) => {
  try {
      res.status(200).json("Haciendo GET en /");
  } catch (error) {
      next(error);
  }
});
// Middleware para manejar errores 404 (Ruta no encontrada)
app.use((req, res, next) => {
  res.status(404).json({ mensaje: 'No se ha encontrado la ruta' }); // Devuelve un JSON en lugar de texto plano para rutas no encontradas
});

// Middleware para manejar errores generales del servidor (500)
app.use((err, req, res, next) => {
  console.error(err.stack); // Registra el stack trace del error en la consola
  res.status(500).json({ mensaje: 'Error en el servidor' }); // Devuelve un JSON en caso de error interno del servidor
});

// Creación del logger utilizando Bunyan con el nombre 'Servidor'
const logger = bunyan.createLogger({ name: 'Servidor' });

const puerto = process.env.PORT || 3000; // Configura el puerto del servidor obtenido de las variables de entorno o usa 3000 por defecto

app.listen(puerto, () => {
  logger.info(`Servidor Levantado en el puerto ${puerto}`); // Registra en el logger que el servidor ha sido levantado en el puerto especificado
});
