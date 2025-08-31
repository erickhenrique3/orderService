import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
  KAFKA_BROKERS: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  INTERNAL_TOKEN: z.string().optional(),
})

export const env = envSchema.parse(process.env)
