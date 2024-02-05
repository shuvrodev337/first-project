import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(20, { message: 'First Name can not be more than 20 charecters' })
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'First Name must be in capitalized format',
    }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must be valid',
    }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().trim().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const studentValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().max(20),
  name: userNameValidationSchema,
  email: z.string().email(),
  gender: z.enum(['male', 'female', 'other']),
  age: z.number().int(),
  dateOfBirth: z.string().min(1),
  avatar: z.string(),
  contactNo: z.string().min(1),
  bloodGroup: z.enum(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']),
  emmergencyContactNo: z.string().min(1),
  presentAddress: z.string().min(1),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().min(1),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchema;
