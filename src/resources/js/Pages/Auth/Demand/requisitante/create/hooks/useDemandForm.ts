// useDemandForm.ts
import { useState } from 'react'

export type DemandStep = 1 | 2 | 3 | 4

export function useDemandForm(initialStep: DemandStep = 1) {
  const [currentStep, setCurrentStep] = useState<DemandStep>(initialStep)

  function next() {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as DemandStep)
    }
  }

  function back() {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as DemandStep)
    }
  }

  return {
    currentStep,
    setCurrentStep,
    next,
    back,
    isFirst: currentStep === 1,
    isLast: currentStep === 4,
  }
}
