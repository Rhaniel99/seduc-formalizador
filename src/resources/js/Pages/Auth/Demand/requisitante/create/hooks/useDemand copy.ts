import { useForm } from '@inertiajs/react'
import { DemandFormData } from '@/Types/Demand/Demand'
import { validateDemandStep } from '@/Pages/Auth/Demand/requisitante/create/validators/validateDemandStep'
import type { DemandStepKey } from '@/Pages/Auth/Demand/requisitante/create/schemas/demand.schema'

type UseDemandOptions = {
  demandId?: string
}

type StepNumber = 1 | 2 | 3 | 4

export function useDemand({ demandId }: UseDemandOptions = {}) {
  const form = useForm<Partial<DemandFormData> & { current_step?: number }>({
    title: '',
    description: '',
    type: undefined,
    nature: undefined,
    technicalArea: undefined,
    urgency: undefined,
    requestingArea: undefined,
    responsibles: [{ name: '', registrationNumber: '' }],
    current_step: 1,
  })

  /* ======================
   |  Helpers de estado
   ====================== */
  const currentStep = (form.data.current_step ?? 1) as StepNumber

  function setStep(step: StepNumber) {
    form.setData('current_step', step)
  }

  /* ======================
   |  Draft
   ====================== */
  function saveDraft(step: StepNumber = currentStep) {
    form.setData('current_step', step)

    if (!demandId) {
      form.post(route('demands.store'), {
        preserveScroll: true,
      })
    } else {
      form.put(route('demands.update', demandId), {
        preserveScroll: true,
      })
    }
  }

  /* ======================
   |  Navegação
   ====================== */
  function nextStep() {
    // se já estiver no último, não avança
    if (currentStep >= 4) return

    // validar apenas o step atual (1..3). DemandStepKey = 1|2|3|'all'
    const stepKey = currentStep as DemandStepKey
    const isValid = validateDemandStep(stepKey, form)

    if (!isValid) return

    // safe cast: currentStep é 1|2|3, então +1 ficará em 2|3|4
    const next = (currentStep + 1) as StepNumber
    saveDraft(next)
    setStep(next)
  }

  function previousStep() {
    if (currentStep <= 1) return
    setStep((currentStep - 1) as StepNumber)
  }

  /* ======================
   |  Finalização
   ====================== */
  function generateDFD() {
    const isValid = validateDemandStep('all', form)

    if (!isValid) return

    form.put(route('demands.finalize', demandId), {
      onSuccess: () => {
        // redirect será controlado pelo backend
      },
    })
  }

  /* ======================
   |  Responsáveis
   ====================== */
  function addResponsible() {
    form.setData('responsibles', [
      ...(form.data.responsibles ?? []),
      { name: '', registrationNumber: '' },
    ])
  }

  function removeResponsible(index: number) {
    form.setData(
      'responsibles',
      form.data.responsibles?.filter((_, i) => i !== index)
    )
  }

  function updateResponsible(
    index: number,
    field: 'name' | 'registrationNumber',
    value: string
  ) {
    form.setData(
      'responsibles',
      form.data.responsibles?.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    )
  }

  return {
    // inertia
    data: form.data,
    setData: form.setData,
    errors: form.errors,
    processing: form.processing,
    recentlySuccessful: form.recentlySuccessful,

    // steps
    currentStep,
    setStep,
    nextStep,
    previousStep,

    // actions
    saveDraft,
    generateDFD,

    // responsibles
    addResponsible,
    removeResponsible,
    updateResponsible,

    // helpers
    clearErrors: form.clearErrors,
    reset: form.reset,
  }
}
