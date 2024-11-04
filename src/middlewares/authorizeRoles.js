export const authorizeRoles = (...allowedRoles) => (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ error: 'Acceso denegado. No posee un rol asignado.' });
    }
    if (!allowedRoles.includes(req.user.userType)) {
        return res.status(403).json({ error: 'Acceso denegado. No tienes los permisos necesarios para acceder al recurso.' });
    }
    next();
};
