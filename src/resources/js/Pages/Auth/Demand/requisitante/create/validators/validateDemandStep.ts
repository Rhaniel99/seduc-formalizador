import { ZodError } from 'zod'
// import { stepSchemas } from '../schemas/demand.schema'
import { InertiaFormProps } from '@inertiajs/react'
import { stepSchemas, DemandStepKey } from '../schemas/demand.schema'

export function validateDemandStep(
    step: DemandStepKey,
    form: InertiaFormProps<any>
): boolean {
    form.clearErrors()

    const schema = stepSchemas[step]
    if (!schema) return true

    const result = schema.safeParse(form.data)

    if (result.success) return true

    applyZodErrorsToInertia(result.error, form)
    return false
}

function applyZodErrorsToInertia(
    error: ZodError,
    form: InertiaFormProps<any>
) {
    error.issues.forEach(issue => {
        const path = issue.path.join('.')

        if (!path) {
            form.setError('form', issue.message)
        } else {
            form.setError(path as any, issue.message)
        }
    })
}
