import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/userService.js';

const ROLE_NAMES = {
    1: 'admin',
    2: 'employee',
    3: 'client'
};

const authMe = async (req, res, next) => {
    req.method = 'NONE';
    const { id: userId } = req.user;

    try {
        const user = await UserService.findById(userId);
        return res.status(200).json(user.getPublicData());
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ error: error.message });
    }
};

const authLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Some data is missing'
        });
    }

    try {
        const user = await UserService.findByEmail(email);

        const passwordCorrect = user && await bcrypt.compare(password, user.password);

        if (!user || !passwordCorrect) {
            return res.status(401).json({
                error: 'invalid user or password'
            });
        }

        const userForToken = {
            id: user.userId,
            userType: ROLE_NAMES[user.userType]
        };

        const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: '24h' });

        return res.status(200).json({
            userRole: ROLE_NAMES[user.userType],
            token: `Bearer ${token}`
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ error: 'Error during login' });
    }
};

export { authMe, authLogin };
