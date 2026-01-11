import { z } from 'zod'

export const responsibleSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  registrationNumber: z.string().min(1, 'Matrícula é obrigatória'),
})

export const demandSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  requestingArea: z.string().min(1, 'Área solicitante é obrigatória'),

  responsibles: z
    .array(responsibleSchema)
    .min(1, 'Informe pelo menos um responsável'),

  type: z.string().min(1, 'Tipo obrigatório'),
  nature: z.string().min(1, 'Natureza obrigatória'),
  technicalArea: z.string().min(1, 'Área técnica obrigatória'),
  urgency: z.string().min(1, 'Urgência obrigatória'),

  description: z.string().min(50, 'Descrição deve ter no mínimo 50 caracteres'),
})

export const stepSchemas = {
  1: demandSchema.pick({
    title: true,
    requestingArea: true,
    responsibles: true,
  }),

  2: demandSchema.pick({
    type: true,
    nature: true,
    technicalArea: true,
    urgency: true,
  }),

  3: demandSchema.pick({
    description: true,
  }),

  all: demandSchema,
} as const


export type DemandStepKey = keyof typeof stepSchemas