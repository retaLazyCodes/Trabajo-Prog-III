import Joi from 'joi';

const officeSchema = Joi.object({
    name: Joi.string()
        .min(3).messages({
            'string.min': 'El nombre debe tener al menos 3 caracteres.',
            'string.max': 'El nombre no debe tener más de 50 caracteres.',
            'string.empty': 'El campo "name" es obligatorio.',
            'any.required': 'El campo "name" es obligatorio.'
        })
        .max(50)
        .required(),
    claimTypeId: Joi.number()
        .integer().messages({
            'number.base': 'El campo "claimTypeId" debe ser un número.',
            'number.integer': 'El campo "claimTypeId" debe ser un número entero.',
            'any.required': 'El campo "claimTypeId" es obligatorio.'
        })
        .required()
});

const updateOfficeSchema = Joi.object({
    name: Joi.string()
        .min(3).messages({
            'string.min': 'El nombre debe tener al menos 3 caracteres.',
            'string.max': 'El nombre no debe tener más de 50 caracteres.'
        })
        .max(50),
    claimTypeId: Joi.number()
        .integer().messages({
            'number.base': 'El campo "claimTypeId" debe ser un número.',
            'number.integer': 'El campo "claimTypeId" debe ser un número entero.'
        }),
    active: Joi.number()
        .valid(0, 1).messages({
            'any.only': 'El campo "active" debe ser 0 o 1.'
        })
}).or('name', 'claimTypeId', 'active').unknown(false);

export {
    officeSchema,
    updateOfficeSchema
};
