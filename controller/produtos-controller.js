const conexion = require('../dataBase'); // Importa la configuración de la conexión a la base de datos

const productosController = {
    // Método para obtener todos los productos
    getProductos(req, res) {
        const comando = 'SELECT * FROM productos';

        // Realiza una consulta para obtener todos los productos
        conexion.query(comando, (err, resultados, campos) => {
            if (err) {
                // Manejo de errores en caso de fallo en la consulta
                return res.status(503).json({ mensaje: 'Error en la consulta' });
            }
            // Retorna los resultados de la consulta en formato JSON
            res.status(200).json(resultados);
        });
    },

    // Método para obtener los últimos productos lanzados
    getLatestProductos(req, res) {
        const comando = 'SELECT * FROM ultimos_lanzamientos ORDER BY id DESC LIMIT 3';

        // Realiza una consulta para obtener los últimos productos lanzados
        conexion.query(comando, (err, resultados, campos) => {
            if (err) {
                // Manejo de errores en caso de fallo en la consulta
                return res.status(503).json({ mensaje: 'Error en la consulta' });
            }
            // Retorna los últimos productos lanzados en formato JSON
            res.status(200).json(resultados);
        });
    },

    // Método para crear un nuevo producto
    crearProducto(req, res) {
        const { nombre, descripcion, genero, valoracion, precio } = req.body;

        // Validación de campos obligatorios antes de realizar la inserción
        if (!nombre || !descripcion || !genero || valoracion == null || !precio) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        // Consulta SQL para insertar un nuevo producto en la base de datos
        const query = "INSERT INTO productos(nombre, descripcion, genero, valoracion, precio) VALUES (?, ?, ?, ?, ?)";

        // Ejecuta la consulta SQL con los datos proporcionados en el body de la solicitud
        conexion.query(query, [nombre, descripcion, genero, valoracion, precio], (err, resultados, campos) => {
            if (err) {
                // Manejo de errores en caso de fallo en la inserción
                console.error(err);
                return res.status(503).json({ mensaje: 'Error en la inserción' });
            }
            // Retorna un mensaje de éxito después de insertar el producto
            res.status(200).json({ mensaje: 'Producto creado correctamente' });
        });
    },

    // Método para eliminar un producto por su ID
    borrarProducto(req, res) {
        const { id } = req.query;

        // Consulta SQL para eliminar un producto en base a su ID
        const comando = "DELETE FROM productos WHERE id = ?";

        // Ejecuta la consulta SQL con el ID proporcionado en la solicitud
        conexion.query(comando, [id], (err, resultados, campos) => {
            if (err) {
                // Manejo de errores en caso de fallo en el borrado
                return res.status(503).json({ mensaje: 'Error en el borrado' });
            }
            // Retorna un mensaje de éxito después de eliminar el producto
            res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
        });
    },

    // Método para obtener un producto por su ID
    obtenerProductoPorId(req, res) {
        const { id } = req.params;

        // Consulta SQL para obtener un producto en base a su ID
        const comando = "SELECT * FROM productos WHERE id = ?";

        // Ejecuta la consulta SQL con el ID proporcionado en la URL
        conexion.query(comando, [id], (err, resultados, campos) => {
            if (err) {
                // Manejo de errores en caso de fallo en la consulta
                return res.status(503).json({ mensaje: 'Error en la consulta' });
            }
            // Retorna el producto encontrado en formato JSON
            res.status(200).json(resultados[0]);
        });
    },

    // Método para actualizar un producto por su ID
    actualizarProducto(req, res) {
        const { id } = req.params;
        const { nombre, descripcion, genero, valoracion, precio } = req.body;

        // Validación de campos obligatorios antes de realizar la actualización
        if (!nombre || !descripcion || !genero || valoracion == null || !precio) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        // Consulta SQL para actualizar un producto en base a su ID
        const comando = "UPDATE productos SET nombre = ?, descripcion = ?, genero = ?, valoracion = ?, precio = ? WHERE id = ?";

        // Ejecuta la consulta SQL con los datos proporcionados en el body de la solicitud
        conexion.query(comando, [nombre, descripcion, genero, valoracion, precio, id], (err, resultados, campos) => {
            if (err) {
                // Manejo de errores en caso de fallo en la actualización
                return res.status(503).json({ mensaje: 'Error al actualizar el producto' });
            }
            // Retorna un mensaje de éxito después de actualizar el producto
            res.status(200).json({ mensaje: 'Producto actualizado correctamente' });
        });
    }
};

module.exports = productosController; // Exporta el controlador de productos
