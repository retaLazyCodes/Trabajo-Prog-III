import Joi from "joi"

// Esquemas de validación
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

const officeSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    claimTypeId: Joi.number().integer().required(),
})

const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  lastname: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  image: Joi.string().optional(),
  active: Joi.boolean().optional(),
}).or('name', 'lastname', 'email', 'password', 'image', 'active')
.unknown(false);  // No permitir campos desconocidos

const updateOfficeSchema = Joi.object({
  
})

const idSchema = Joi.number().integer().positive().required()

const officeIdSchema = Joi.number().integer().positive().required()

  // Funciones para validar datos
export  function validateUser  (data, res)  {
  const { error } = userSchema.validate(data);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
};

export function validateOffice  (data, res)  {
  const { error } = officeSchema.validate(data);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
};

export function validateUpdateUser (data, res) {
  const { error } = updateUserSchema.validate(data);
  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  };
}

export  function validateId  (data, res)  {
  const { error } = idSchema.validate(data);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
};

export  function validateOfficeId  (data, res)  {
  const { error } = officeIdSchema.validate(data);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
};