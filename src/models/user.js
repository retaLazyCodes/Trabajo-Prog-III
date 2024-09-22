import { pool } from '../config/db.js';
import { mapFields } from './utils.js';

class User {
    constructor (userId, name, lastname, email, password, userType, image, active) {
        this.userId = userId;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.image = image;
        this.active = active;
    }

    static async getAll () {
        try {
            const [rows] = await pool.query('SELECT * FROM usuarios');
            if (rows.length) {
                return rows.map((user) =>
                    new User(user.idUsuario, user.nombre,
                        user.apellido, user.correoElectronico,
                        user.contrasenia, user.idTipoUsuario,
                        user.imagen, user.activo
                    )
                );
            }
            return [];
        } catch (err) {
            console.error('Error finding user by ID:', err);
            throw err;
        }
    }

    static async findById (userId) {
        try {
            const [rows] = await pool.query('SELECT * FROM usuarios WHERE idUsuario = ?', [userId]);
            if (rows.length) {
                const user = rows[0];
                return new User(user.idUsuario, user.nombre,
                    user.apellido, user.correoElectronico,
                    user.contrasenia, user.idTipoUsuario,
                    user.imagen, user.activo
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
            const [rows] = await pool.query('SELECT * FROM usuarios WHERE correoElectronico = ?', [email]);
            if (rows.length) {
                const user = rows[0];
                return new User(user.idUsuario, user.nombre,
                    user.apellido, user.correoElectronico,
                    user.contrasenia, user.idTipoUsuario,
                    user.imagen, user.activo
                );
            }
            return null;
        } catch (err) {
            console.error('Error finding user by email:', err);
            throw err;
        }
    }

    static async create (userData) {
        const { name, lastname, email, password, userType, image, active } = userData;
        try {
            const [result] = await pool.query(
                'INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [name, lastname, email, password, userType, image, active]
            );
            return new User(result.insertId, name, lastname, email, password, userType, image, active);
        } catch (err) {
            console.error('Error creating user:', err);
            throw err;
        }
    }

    static async update (fieldsToUpdate, values) {
        try {
            const mappedFields = mapFields(fieldsToUpdate);
            const query = `UPDATE usuarios SET ${mappedFields.join(', ')} WHERE idUsuario = ?`;
            return await pool.query(query, values);
        } catch (err) {
            console.error('Error updating user:', err);
            throw err;
        }
    }
}

export { User };
