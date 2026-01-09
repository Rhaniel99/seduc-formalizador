import { useForm } from '@inertiajs/react'
import type { LoginPayload } from '@/Types/User'
import { loginSchema } from '../schemas/loginSchema'

type LoginFormData = LoginPayload & { form?: string }

export default function useAuth() {
  return {
    login: useLoginForm(),
  }
}

function useLoginForm() {
  const form = useForm<LoginFormData>(loginDefaults())

  function submit() {
    // Validamos os dados atuais do form com Zod
    const result = loginSchema.safeParse(form.data)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        if (!issue.path || issue.path.length === 0) {
          form.setError('form', issue.message)
        } else {
          const field = String(issue.path[0])
          form.setError(field as any, issue.message)
        }
      })

      return
    }

    form.clearErrors()
    form.post(route('auth.login'), {
      onError: () => {
        form.reset('password')
      },
    })
  }

  return {
    submit,
    data: form.data,
    setData: form.setData,
    processing: form.processing,
    errors: form.errors,
    recentlySuccessful: form.recentlySuccessful,

    // helpers
    reset: form.reset,
    clearErrors: form.clearErrors,
  }
}

function loginDefaults(): LoginFormData {
  return {
    identifier: '',
    password: '',
    remember: false,
    form: undefined,
  }
}
