import { z } from 'zod';

const matriculaRegex = /^[A-Za-z0-9._-]{3,20}$/;

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'Informe e-mail ou matrícula')
    .refine((val) => {
      // no whitespace (already trimmed) but avoid internal spaces
      if (/\s/.test(val)) return false;

      // either valid email OR matches matricula pattern
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      const isMatricula = matriculaRegex.test(val);
      return isEmail || isMatricula;
    }, { message: 'Informe um e-mail válido ou uma matrícula (3-20 chars, letras/números/._-)' }),
  password: z.string().min(1, 'Informe a senha'),
  remember: z.boolean().optional().default(false),
});
