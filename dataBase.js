
// require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env
// const express = require('express');
// const mysql = require('mysql2'); // Usamos mysql2 en lugar de mysql

// const app = express();
// const port = process.env.PORT || 3000; // Usa el puerto del .env o el 3000 por defecto

// // Configura la conexión a la base de datos
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST, // Usar la variable de entorno para el host
//     user: process.env.DB_USER, // Usar la variable de entorno para el usuario
//     password: process.env.DB_PASSWORD, // Usar la variable de entorno para la contraseña
//     database: process.env.DB_DATABASE, // Usar la variable de entorno para el nombre de la base de datos
//     port: 3306 // Puerto MySQL, generalmente 3306
// });

// // Conectar a la base de datos
// connection.connect((err) => {
//     if (err) {
//         console.error('Error al conectarse a la base de datos:', err);
//         return;
//     }
//     console.log('Conexión exitosa a la base de datos');
// });

// app.listen(port, () => {
//     console.log(`Servidor escuchando en http://localhost:${port}`);
// });
















require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env
const mysql = require('mysql2'); // Importa el módulo MySQL para la conexión a la base de datos
const bunyan = require('bunyan'); // Importa el módulo Bunyan para la creación de registros de actividad

// Crea un registro de actividad (logger) con el nombre 'Base de Datos'
const logger = bunyan.createLogger({ name: 'Base de Datos' });

// Configuración de la conexión a la base de datos usando variables de entorno
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,       // Host de la base de datos obtenido del archivo .env
    user: process.env.DB_USER,       // Usuario de la base de datos obtenido del archivo .env
    password: process.env.DB_PASSWORD, // Contraseña de la base de datos obtenida del archivo .env
    database: process.env.DB_DATABASE  || 3306 // Nombre de la base de datos obtenido del archivo .env
});

try {
    // Intenta establecer la conexión a la base de datos
    conexion.connect((err) => {
        if (err) {
            throw err; // Lanza un error si no se puede conectar a la base de datos
        }
        logger.info('Conectado a la BD satisfactoriamente'); // Registra en el logger que la conexión fue exitosa
    });
} catch (error) {
    logger.error('Error en la conexión: ' + error); // Registra en el logger un error si la conexión falla
}

module.exports = conexion; // Exporta el objeto de conexión para ser utilizado en otros módulos
