import { pool } from '../config/db.js';
import { mapFields } from './utils.js';
import { config } from '../config/index.js';

class User {
    constructor(userId, name, lastname, email, password, userType, image, active) {
        this.userId = userId;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.image = image;
        this.active = active;
    }

    static async getAll() {
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

    static async findById(userId) {
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

    static async findByEmail(email) {
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

    static async create(userData, file) {
        const { name, lastname, email, password, userType, active } = userData;
        try {
            let imagePath = null;
            if (file) {
                imagePath = `http://localhost:${config.server.PORT}/uploads/` + file.filename;
            }
            const [result] = await pool.query(
                'INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [name, lastname, email, password, userType, imagePath, active]
            );
            return new User(result.insertId, name, lastname, email, password, userType, imagePath, active);
        } catch (err) {
            console.error('Error creating user:', err);
            throw err;
        }
    }

    static async update(fieldsToUpdate, values, file) {
        try {
            if (file) {
                fieldsToUpdate.push('imagen');
                const imagePath = `http://localhost:${config.server.PORT}/uploads/` + file.filename;
                values.push(imagePath);
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

export { User };
