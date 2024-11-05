import { officeSchema, updateOfficeSchema } from '../schemas/index.js';

export const validateOffice = (req, res, next) => {
    const { error } = officeSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const customMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: customMessages });
    }

    next();
};

export const validateUpdateOffice = (req, res, next) => {
    const { error } = updateOfficeSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const customMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: customMessages });
    }

    next();
};
