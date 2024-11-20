import { UserDAO } from '../dao/userDao.js';
import { config } from '../config/index.js';

class UserService {
    static async getAll () {
        try {
            const users = await UserDAO.getAllUsers();
            return users.map(user => user.getPublicData());
        } catch (err) {
            console.error('Error fetching all users:', err);
            throw err;
        }
    }

    static async findById (userId) {
        try {
            return await UserDAO.findUserById(userId);
        } catch (err) {
            console.error('Error finding user by ID:', err);
            throw err;
        }
    }

    static async findByEmail (email) {
        try {
            return await UserDAO.findUserByEmail(email);
        } catch (err) {
            console.error('Error finding user by email:', err);
            throw err;
        }
    }

    static async create (userData, file) {
        const { name, lastname, email, password } = userData;
        const USER_TYPE = 2; // Empleado
        const imagePath = file ? `http://localhost:${config.server.PORT}/uploads/${file.filename}` : null;
        try {
            return await UserDAO.createUser({ name, lastname, email, password, userType: USER_TYPE }, imagePath);
        } catch (err) {
            console.error('Error creating user:', err);
            throw err;
        }
    }

    static async createClient (userData, file) {
        const { name, lastname, email, password } = userData;
        const USER_TYPE = 3; // Cliente
        const imagePath = file ? `http://localhost:${config.server.PORT}/uploads/${file.filename}` : null;
        try {
            return await UserDAO.createUser({ name, lastname, email, password, userType: USER_TYPE }, imagePath);
        } catch (err) {
            console.error('Error creating client:', err);
            throw err;
        }
    }

    static async update (fieldsToUpdate, values, file) {
        try {
            if (file) {
                fieldsToUpdate.push('imagen = ?');
                const imagePath = `http://localhost:${config.server.PORT}/uploads/${file.filename}`;
                values.splice(values.length - 1, 0, imagePath);
            }
            return await UserDAO.updateUser(fieldsToUpdate, values);
        } catch (err) {
            console.error('Error updating user:', err);
            throw err;
        }
    }
}

export { UserService };
