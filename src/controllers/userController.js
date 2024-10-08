import { User } from '../models/user.js';

const getUsers = async (req, res) => {
    const users = await User.getAll();
    console.log(users);
    res.status(200).json(users);
};

const createUser = async (req, res) => {
    const newUser = await User.create(req.body, req.file);
    res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Filtrar campos que se van a actualizar
        const fieldsToUpdate = [];
        const values = [];

        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) {
                fieldsToUpdate.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (fieldsToUpdate.length === 0 || !req.file) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        await User.update(fieldsToUpdate, [...values, id], req.file);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Error updating user' });
    }
};

export { getUsers, createUser, updateUser };
