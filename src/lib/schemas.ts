import { z } from 'zod';

export const ruleSchema = z.object({
  name: z.string().min(3, { message: 'Rule name must be at least 3 characters.' }),
  description: z.string().optional(),
  ruleDefinition: z.string().min(10, { message: 'Rule definition must be at least 10 characters.' }),
  clarifiedRule: z.string().optional(),
  username: z.string().min(1, { message: 'Username is required for authentication.' }),
  password: z.string().min(1, { message: 'Password is required for authentication.' }),
});
