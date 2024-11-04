import Joi from 'joi';

const claimSchema = Joi.object({
    subject: Joi.string()
        .min(5).max(60).required().messages({
            'string.min': 'El asunto debe tener al menos 5 caracteres.',
            'string.max': 'El asunto no debe tener más de 60 caracteres.',
            'string.empty': 'El campo "subject" es obligatorio.',
            'any.required': 'El campo "subject" es obligatorio.'
        }),
    description: Joi.string()
        .optional().min(5).max(50).messages({
            'string.min': 'La descripción debe tener al menos 5 caracteres.',
            'string.max': 'La descripción no debe tener más de 50 caracteres.',
            'string.empty': 'El campo "description" no puede estar vacío.'
        }),
    claimTypeId: Joi.number()
        .integer().required().messages({
            'number.base': 'El campo "claimTypeId" debe ser un número.',
            'number.integer': 'El campo "claimTypeId" debe ser un número entero.',
            'any.required': 'El campo "claimTypeId" es obligatorio.'
        })
});

const claimTypeSchema = Joi.object({
    description: Joi.string()
        .min(5).message('La descripción debe tener al menos 5 caracteres.')
        .max(50).message('La descripción no debe tener más de 50 caracteres.')
        .required().messages({
            'string.empty': 'El campo "description" es obligatorio.',
            'any.required': 'El campo "description" es obligatorio.'
        })
});

const updateclaimTypeSchema = Joi.object({
    description: Joi.string().messages({
        'string.base': 'El campo "description" debe ser un texto.'
    }),
    active: Joi.number().valid(0, 1).messages({
        'number.base': 'El campo "active" debe ser un número.',
        'any.only': 'El campo "active" debe ser 0 o 1.'
    })
}).or('description', 'active').unknown(false);

export {
    claimSchema,
    claimTypeSchema,
    updateclaimTypeSchema
};
