import { pool } from '../config/db.js';
import { User } from '../models/user.js';
import { mapFields } from '../models/utils.js';
import { config } from '../config/index.js';

class UserService {
    static async getAll () {
        try {
            const [rows] = await pool.query('SELECT * FROM usuarios WHERE idUsuarioTipo = 2 AND activo = 1');
            if (rows.length) {
                return rows.map((user) =>
                    new User(user.idUsuario, user.nombre,
                        user.apellido, user.correoElectronico,
                        user.contrasenia, user.idUsuarioTipo, user.imagen, user.activo
                    ).getPublicData()
                );
            }
            return [];
        } catch (err) {
            console.error('Error fetching all users:', err);
            throw err;
        }
    }

    static async findById (userId) {
        try {
            const [rows] = await pool.query('SELECT * FROM usuarios WHERE idUsuario = ? AND idUsuarioTipo = 2', [userId]);
            if (rows.length) {
                const user = rows[0];
                return new User(user.idUsuario, user.nombre,
                    user.apellido, user.correoElectronico,
                    user.contrasenia, user.idUsuarioTipo, user.imagen, user.activo
                );
            }
            return null;
        } catch (err) {
            console.error('Error finding user by ID:', err);
            throw err;
        }
    }

    static async findByEmail (email) {
        try {
            const [rows] = await pool.query('SELECT * FROM usuarios WHERE correoElectronico = ? AND idUsuarioTipo = 2', [email]);
            if (rows.length) {
                const user = rows[0];
                return new User(user.idUsuario, user.nombre,
                    user.apellido, user.correoElectronico,
                    user.contrasenia, user.idUsuarioTipo, user.imagen, user.activo
                );
            }
            return null;
        } catch (err) {
            console.error('Error finding user by email:', err);
            throw err;
        }
    }

    static async create (userData, file) {
        const { name, lastname, email, password } = userData;
        const USER_TYPE = 2; // Empleado
        try {
            let imagePath = null;
            if (file) {
                imagePath = `http://localhost:${config.server.PORT}/uploads/` + file.filename;
            }
            const [result] = await pool.query(
                'INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [name, lastname, email, password, USER_TYPE, imagePath, 1]
            );
            return new User(result.insertId, name, lastname, email, password, USER_TYPE, imagePath, 1);
        } catch (err) {
            console.error('Error creating user:', err);
            throw err;
        }
    }

    static async update (fieldsToUpdate, values, file) {
        try {
            if (file) {
                fieldsToUpdate.push('imagen = ?');
                const imagePath = `http://localhost:${config.server.PORT}/uploads/` + file.filename;
                values.splice(values.length - 1, 0, imagePath);
            }
            const mappedFields = mapFields(fieldsToUpdate);
            const query = `UPDATE usuarios SET ${mappedFields.join(', ')} WHERE idUsuario = ?`;
            return await pool.query(query, values);
        } catch (err) {
            console.error('Error updating user:', err);
            throw err;
        }
    }
}

export { UserService };
