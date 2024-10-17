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


  // Funciones para validar datos
export  function validateUser  (data)  {
  const { error } = userSchema.validate(data);
  if (error) {
    return error.details[0].message;
  }
};

export function validateOffice  (data)  {
  const { error } = officeSchema.validate(data);
  if (error) {
    return error.details[0].message;
  }
};

