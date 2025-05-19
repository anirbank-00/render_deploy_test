import { z } from 'zod';

const loginSchema = z.object({
  phone: z
    .string()
    .min(10, { message: 'Phone number must be atleast 10 digits' }),
  // .max(50, { message: 'Email must be at most 50 characters' })
  // .email({ message: 'Must be a valid email address' }),
  otp: z
    .string()
    .min(4, { message: 'OTP must be atleast 4 digits' }),
  // .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Password must contain at least one special character' }),
  keepLoggedIn: z.boolean().optional(),
});

const validateSigninSchema = z.object({
  body: loginSchema,
});

export default {
  validateSigninSchema,
};