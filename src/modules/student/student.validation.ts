import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/, { name: 'capitalized format' }),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .required()
    .max(20)
    .pattern(/^[A-Za-z]+$/, { name: 'valid' }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  age: Joi.number().integer().positive(),
  dateOfBirth: Joi.string().required(),
  avatar: Joi.string(),
  contactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'B+',
    'O+',
    'AB+',
    'A-',
    'B-',
    'O-',
    'AB-',
  ),
  emmergencyContactNo: Joi.string().required(),
  presentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().required(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
