// useDemand.ts
import { useForm } from '@inertiajs/react'
import { validateDemandStep } from '../validators/validateDemandStep'
import { DemandFormData } from '@/Types/Demand/Demand'

export function useDemand({ demandId }: { demandId?: string } = {}) {
  const form = useForm<Partial<DemandFormData>>({
    title: '',
    description: '',
    type: undefined,
    nature: undefined,
    technicalArea: undefined,
    urgency: undefined,
    requestingArea: undefined,
    responsibles: [{ name: '', registrationNumber: '' }],
  })

  function saveDraft() {
    if (!demandId) {
      form.post(route('demand.store'), { preserveScroll: true })
    } else {
      form.put(route('demand.update', demandId), { preserveScroll: true })
    }
  }

  function validateAndSave(step: 1 | 2 | 3) {
    const valid = validateDemandStep(step, form)
    if (!valid) return false

    saveDraft()
    return true
  }

  function finalize() {
    const valid = validateDemandStep('all', form)
    if (!valid) return

    form.put(route('demand.finalize', demandId))
  }

  return {
    form,
    saveDraft,
    validateAndSave,
    finalize,
  }
}
