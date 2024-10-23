const conexion = require('../dataBase'); // Importa la configuración de la conexión a la base de datos

const usuariosController = {
    // Método para registrar un nuevo usuario
    registrarUsuario: (req, res) => {
        const { nombre, email, contrasena } = req.body;
        const comando = 'INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)';

        // Ejecuta una consulta para insertar un nuevo usuario en la base de datos
        conexion.query(comando, [nombre, email, contrasena], (err, resultados) => {
            if (err) {
                // Manejo de errores en caso de fallo en la inserción
                console.error('Error al registrar usuario:', err);
                return res.status(500).json({ mensaje: 'Error al registrar usuario' });
            }
            // Retorna un mensaje de éxito y el ID del usuario insertado
            res.status(200).json({ mensaje: 'Usuario registrado correctamente', id: resultados.insertId });
        });
    },

    // Método para iniciar sesión de un usuario existente
    loginUsuario: (req, res) => {
        const { email, contrasena } = req.body;
        const comando = 'SELECT * FROM usuarios WHERE email = ? AND contrasena = ?';

        // Ejecuta una consulta para verificar las credenciales del usuario
        conexion.query(comando, [email, contrasena], (err, resultados) => {
            if (err) {
                // Manejo de errores en caso de fallo en la consulta
                console.error('Error al iniciar sesión:', err);
                return res.status(500).json({ mensaje: 'Error al iniciar sesión' });
            }

            // Verifica si se encontró algún usuario con las credenciales proporcionadas
            if (resultados.length > 0) {
                res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario: resultados[0] });
            } else {
                // Retorna un mensaje de error si las credenciales son inválidas
                res.status(401).json({ mensaje: 'Credenciales inválidas' });
            }
        });
    }
};

module.exports = usuariosController; // Exporta el controlador de usuarios
