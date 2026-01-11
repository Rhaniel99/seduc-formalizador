import { Head } from '@inertiajs/react'
import { PageHeader } from '@/Pages/Auth/Dashboard/components/PageHeader'
import { Stepper } from './components/Stepper'
import { FormNavigation } from './components/FormNavigation'
import { DEMAND_STEPS } from './steps/steps.config'
import { useDemandForm } from './hooks/useDemandForm'
import { useDemand } from './hooks/useDemand'

export default function Index() {
  const { currentStep, next, back } = useDemandForm()
  const { form, validateAndSave, finalize } = useDemand()

  const stepConfig = DEMAND_STEPS.find(s => s.id === currentStep)!
  const StepComponent = stepConfig.Component

  return (
    <>
      <Head title="Criar Nova Demanda" />

      <PageHeader
        title="Nova Demanda"
        description="Preencha o formulário para formalizar sua demanda de TI"
      />

      <div className="p-8 space-y-6">
        <Stepper steps={DEMAND_STEPS} currentStep={currentStep} />

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <StepComponent
            data={form.data}
            errors={form.errors}
            onChange={form.setData}
            onAddResponsible={() =>
              form.setData('responsibles', [
                ...(form.data.responsibles ?? []),
                { name: '', registrationNumber: '' },
              ])
            }
            onRemoveResponsible={index =>
              form.setData(
                'responsibles',
                form.data.responsibles?.filter((_, i) => i !== index)
              )
            }
            onChangeResponsible={(i, field, value) =>
              form.setData(
                'responsibles',
                form.data.responsibles?.map((r, idx) =>
                  idx === i ? { ...r, [field]: value } : r
                )
              )
            }
          />

          <FormNavigation
            currentStep={currentStep}
            totalSteps={DEMAND_STEPS.length}
            onBack={back}
            onNext={() => {
              const ok = validateAndSave(currentStep as 1 | 2 | 3)
              if (ok) next()
            }}
            onSaveDraft={() => form.post(route('demands.store'))}
            onGenerate={finalize}
          />
        </div>
      </div>
    </>
  )
}
