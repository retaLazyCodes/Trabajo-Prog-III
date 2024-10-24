import { userSchema, updateUserSchema } from '../schemas/index.js';

export const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const customMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: customMessages });
    }

    next();
};

export const validateUpdateUser = (req, res, next) => {
    const { error } = updateUserSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const customMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: customMessages });
    }

    next();
};
