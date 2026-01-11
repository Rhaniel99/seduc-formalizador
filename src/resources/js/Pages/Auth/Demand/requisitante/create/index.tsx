import { Head } from '@inertiajs/react'
import { PageHeader } from '@/Pages/Auth/Dashboard/components/PageHeader'
import { Stepper } from './components/Stepper'
import { FormNavigation } from './components/FormNavigation'
import { useDemandForm } from './hooks/useDemandForm'
import { DEMAND_STEPS } from './steps/steps.config'

export default function Index() {
  const {
    formData,
    errors,
    currentStep,
    setCurrentStep,
    updateField,
    addResponsible,
    removeResponsible,
    updateResponsible,
    validateStep,
  } = useDemandForm()

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
            data={formData}
            errors={errors}
            onChange={updateField}
            onAddResponsible={addResponsible}
            onRemoveResponsible={removeResponsible}
            onChangeResponsible={updateResponsible}
          />

          <FormNavigation
            currentStep={currentStep}
            totalSteps={DEMAND_STEPS.length}
            onBack={() => setCurrentStep(s => s - 1)}
            onNext={() => validateStep(currentStep) && setCurrentStep(s => s + 1)}
            onSaveDraft={() => console.log('draft')}
            onGenerate={() => console.log('generate')}
          />
        </div>
      </div>
    </>
  )
}
