import { useState } from 'react'
import { DemandFormData } from '@/Types/Demand/Demand'

export function useDemandForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<Partial<DemandFormData>>({
    responsibles: [{ name: '', registrationNumber: '' }],
  })

  const updateField = (field: keyof DemandFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => {
      const copy = { ...prev }
      delete copy[field]
      return copy
    })
  }

  const addResponsible = () =>
    setFormData(prev => ({
      ...prev,
      responsibles: [...(prev.responsibles ?? []), { name: '', registrationNumber: '' }],
    }))

  const removeResponsible = (index: number) =>
    setFormData(prev => ({
      ...prev,
      responsibles: prev.responsibles?.filter((_, i) => i !== index),
    }))

  const updateResponsible = (
    index: number,
    field: 'name' | 'registrationNumber',
    value: string
  ) =>
    setFormData(prev => ({
      ...prev,
      responsibles: prev.responsibles?.map((r, i) =>
        i === index ? { ...r, [field]: value } : r
      ),
    }))

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.title?.trim()) newErrors.title = 'Título é obrigatório'
      if (!formData.requestingArea) newErrors.requestingArea = 'Área solicitante é obrigatória'

      if (!formData.responsibles?.length) {
        newErrors.responsibles = 'Informe pelo menos um responsável'
      } else {
        formData.responsibles.forEach((r, i) => {
          if (!r.name.trim()) newErrors[`responsibles.${i}.name`] = 'Nome é obrigatório'
          if (!r.registrationNumber.trim())
            newErrors[`responsibles.${i}.registrationNumber`] = 'Matrícula é obrigatória'
        })
      }
    }

    if (step === 2) {
      if (!formData.type) newErrors.type = 'Tipo obrigatório'
      if (!formData.nature) newErrors.nature = 'Natureza obrigatória'
      if (!formData.technicalArea) newErrors.technicalArea = 'Área técnica obrigatória'
      if (!formData.urgency) newErrors.urgency = 'Urgência obrigatória'
    }

    if (step === 3) {
      if (!formData.description?.trim())
        newErrors.description = 'Descrição obrigatória'
      else if (formData.description.length < 50)
        newErrors.description = 'Mínimo 50 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return {
    formData,
    errors,
    currentStep,
    setCurrentStep,
    updateField,
    addResponsible,
    removeResponsible,
    updateResponsible,
    validateStep,
  }
}
