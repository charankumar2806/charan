import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['commuter', 'operator', 'administrator']).default('commuter')
});

export const routeSchema = z.object({
  origin: z.string().min(2),
  destination: z.string().min(2),
  vehicleType: z.string(),
  fuelType: z.string(),
  preference: z.string()
});

export const incidentSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  category: z.string(),
  severity: z.string(),
  latitude: z.number(),
  longitude: z.number()
}).passthrough();
