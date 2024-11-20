import bcrypt from 'bcryptjs';
import { UserService } from '../services/userService.js';

const getUsers = async (req, res) => {
    try {
        const users = await UserService.getAll();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error getting users:', err);
        res.status(500).json({ error: 'Error getting users' });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await UserService.findByEmail(email);
        if (userExists) {
            return res.status(409).json({ message: 'Email is already taken' });
        }

        // Encriptar la contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserService.create({
            ...req.body,
            password: hashedPassword
        }, req.file);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Error creating user' });
    }
};

const createClient = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await UserService.findByEmail(email);
        if (userExists) {
            return res.status(409).json({ message: 'Email is already taken' });
        }

        // Encriptar la contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newClient = await UserService.createClient({
            ...req.body,
            password: hashedPassword
        }, req.file);
        res.status(201).json(newClient);
    } catch (err) {
        console.error('Error creating client:', err);
        res.status(500).json({ error: 'Error creating client' });
    }
};



const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const user = await UserService.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verificar si el email ya está en uso
        if (updates.email) {
            const emailExists = await UserService.findByEmail(updates.email);
            if (emailExists && emailExists.userId.toString() !== id.toString()) {
                return res.status(409).json({ message: 'Email is already taken' });
            }
        }

        // Filtrar campos que se van a actualizar
        const fieldsToUpdate = [];
        const values = [];

        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) {
                // Si el campo es 'password', encriptar la nueva contraseña
                if (key === 'password') {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(value, salt);
                    fieldsToUpdate.push(`${key} = ?`);
                    values.push(hashedPassword);
                } else {
                    fieldsToUpdate.push(`${key} = ?`);
                    values.push(value);
                }
            }
        }

        if (fieldsToUpdate.length === 0 && !req.file) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        await UserService.update(fieldsToUpdate, [...values, id], req.file);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Error updating user' });
    }
};

export { getUsers, createUser, updateUser, createClient };
