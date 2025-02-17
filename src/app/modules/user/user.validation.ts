import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    email: z.string().email({ message: 'Invalid email format' }),
    role: z.enum(['admin', 'user']).default('user'),
    isBlocked: z.boolean().default(false),
  }),
});

export const userValidations = {
  userValidationSchema,
};
