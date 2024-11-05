import { claimSchema, claimTypeSchema, updateClaimTypeSchema } from '../schemas/index.js';

export const validateClaim = (req, res, next) => {
    const { error } = claimSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const customMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: customMessages });
    }

    next();
};

export const validateClaimType = (req, res, next) => {
    const { error } = claimTypeSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const customMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: customMessages });
    }

    next();
};

export const validateUpdateClaimType = (req, res, next) => {
    const { error } = updateClaimTypeSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const customMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: customMessages });
    }

    next();
};
