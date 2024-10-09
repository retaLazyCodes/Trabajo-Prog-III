import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Separar "Bearer" del token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Asignar usuario decodificado a req.user
        next(); // Continuar a la siguiente ruta o middleware
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token.' });
    }
};

export default authMiddleware;
