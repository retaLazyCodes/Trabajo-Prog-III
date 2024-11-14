import { pool } from '../config/db.js';
import { User } from '../models/user.js';

class UserDAO {
    static async getAllUsers () {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE idUsuarioTipo = 2 AND activo = 1');
        return rows.map(row => new User(row.idUsuario, row.nombre, row.apellido, row.correoElectronico, row.contrasenia, row.idUsuarioTipo, row.imagen, row.activo));
    }

    static async findUserById (userId) {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE idUsuario = ? AND activo = 1', [userId]);
        return rows.length ? new User(rows[0].idUsuario, rows[0].nombre, rows[0].apellido, rows[0].correoElectronico, rows[0].contrasenia, rows[0].idUsuarioTipo, rows[0].imagen, rows[0].activo) : null;
    }

    static async findUserByEmail (email) {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE correoElectronico = ?', [email]);
        return rows.length ? new User(rows[0].idUsuario, rows[0].nombre, rows[0].apellido, rows[0].correoElectronico, rows[0].contrasenia, rows[0].idUsuarioTipo, rows[0].imagen, rows[0].activo) : null;
    }

    static async createUser (userData, imagePath) {
        const { name, lastname, email, password, userType } = userData;
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, lastname, email, password, userType, imagePath, 1]
        );
        return new User(result.insertId, name, lastname, email, password, userType, imagePath, 1);
    }

    static async updateUser (fieldsToUpdate, values) {
        const query = `UPDATE usuarios SET ${fieldsToUpdate.join(', ')} WHERE idUsuario = ?`;
        return await pool.query(query, values);
    }
}

export { UserDAO };
