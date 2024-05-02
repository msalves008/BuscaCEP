import { z } from 'zod'

export const zipCodeSchema = z.object({
  zipCode: z.string().min(8, { message: 'CEP deve conter 8 dígitos' }).max(8),
})
export type FormData = z.infer<typeof zipCodeSchema>
