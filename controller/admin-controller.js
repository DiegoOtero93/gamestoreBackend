const conexion = require('../dataBase'); // Importa la configuración de la conexión a la base de datos

const adminController = {
    async checkUsuarios(req, res) {
        try {
            let { nombre, contrasena } = req.query; // Obtiene nombre y contraseña desde la consulta

            let comando = 'SELECT * FROM admi WHERE nombre = ? AND contrasena = ?'; // Comando SQL para buscar usuario administrador

            // Realiza la consulta a la base de datos
            const resultados = await new Promise((resolve, reject) => {
                conexion.query(comando, [nombre, contrasena], (err, resultados) => {
                    if (err) reject(err); // Rechaza la promesa si hay un error
                    resolve(resultados); // Resuelve la promesa con los resultados de la consulta
                });
            });

            // Si se encuentra un usuario administrador, responde con los datos
            if (resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                // Si no se encuentra ningún usuario, responde con error 404
                res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error en la consulta:', error); // Registra el error en la consola
            res.status(500).json({ mensaje: 'Error en la consulta' }); // Responde con error 500 al cliente
        }
    }
};

module.exports = adminController; // Exporta el controlador de administradores
