import Joi from 'joi';

const userSchema = Joi.object({
    name: Joi.string()
        .min(3).message('El nombre debe tener al menos 3 caracteres.')
        .max(30).message('El nombre no debe tener más de 30 caracteres.')
        .required().messages({
            'string.empty': 'El campo "name" es obligatorio.',
            'any.required': 'El campo "name" es obligatorio.'
        }),
    lastname: Joi.string()
        .min(3).message('El apellido debe tener al menos 3 caracteres.')
        .max(30).message('El apellido no debe tener más de 30 caracteres.')
        .required().messages({
            'string.empty': 'El campo "lastname" es obligatorio.',
            'any.required': 'El campo "lastname" es obligatorio.'
        }),
    email: Joi.string()
        .email().message('El correo electrónico no es válido.')
        .required().messages({
            'string.empty': 'El campo "email" es obligatorio.',
            'any.required': 'El campo "email" es obligatorio.'
        }),
    password: Joi.string()
        .min(6).message('La contraseña debe tener al menos 6 caracteres.')
        .required().messages({
            'string.empty': 'El campo "password" es obligatorio.',
            'any.required': 'El campo "password" es obligatorio.'
        }),
    image: Joi.binary()
        .messages({
            'binary.base': 'La imagen debe ser un archivo.'
        })
});

const updateUserSchema = Joi.object({
    name: Joi.string().messages({
        'string.base': 'El campo "name" debe ser un texto.'
    }),
    lastname: Joi.string().messages({
        'string.base': 'El campo "lastname" debe ser un texto.'
    }),
    email: Joi.string().email().messages({
        'string.email': 'El correo electrónico no es válido.'
    }),
    password: Joi.string()
        .min(6).message('La contraseña debe tener al menos 6 caracteres.')
        .messages({ 'string.base': 'El campo "password" debe ser un texto.' }),
    image: Joi.binary().messages({
        'binary.base': 'La imagen debe ser un archivo.'
    }),
    active: Joi.number().valid(0, 1).messages({
        'number.base': 'El campo "active" debe ser un número.',
        'any.only': 'El campo "active" debe ser 0 o 1.'
    })
}).or('name', 'lastname', 'email', 'password', 'image', 'active').unknown(false);

export {
    userSchema,
    updateUserSchema
};
