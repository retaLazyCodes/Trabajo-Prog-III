import Joi from 'joi';

const claimSchema = Joi.object({
    idReclamo: Joi.number()
        .positive().required(),
    asunto: Joi.string()
        .min(3).max(60).required(),
    descripcion: Joi.string()
        .optional().min(5).max(50),
    oficina: Joi.string()
        .min(1).max(30).required(),
})

const claimTypeSchema = Joi.object({
    claimTypeId: Joi.number()
        .positive().required(),
    descripcion: Joi.string()
        .required().min(5).max(50),
    activo: Joi.number()
        .valid(0, 1).required(),
})

export {
    claimSchema,
    claimTypeSchema
};