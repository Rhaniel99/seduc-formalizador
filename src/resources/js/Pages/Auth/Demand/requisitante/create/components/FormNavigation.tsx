import { Button } from '@/Components/ui/button'
import { ChevronLeft, ChevronRight, Save, FileCheck } from 'lucide-react'

type Props = {
  currentStep: number
  totalSteps?: number
  onBack: () => void
  onNext: () => void
  onSaveDraft: () => void
  onGenerate: () => void
  isNextDisabled?: boolean
  isGenerateDisabled?: boolean
}

export function FormNavigation({
  currentStep,
  totalSteps = 4,
  onBack,
  onNext,
  onSaveDraft,
  onGenerate,
  isNextDisabled = false,
  isGenerateDisabled = false,
}: Props) {
  const isLast = currentStep >= totalSteps

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
      <div>
        {currentStep > 1 && (
          <Button variant="outline" onClick={onBack} aria-label="Voltar">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onSaveDraft}
          aria-label="Salvar rascunho"
          title="Salvar rascunho"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Rascunho
        </Button>

        {!isLast ? (
          <Button
            onClick={onNext}
            style={{ backgroundColor: 'var(--institutional-blue)' }}
            disabled={isNextDisabled}
            aria-disabled={isNextDisabled}
            aria-label="Próximo"
          >
            Próximo
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={onGenerate}
            style={{ backgroundColor: 'var(--status-success)' }}
            disabled={isGenerateDisabled}
            aria-disabled={isGenerateDisabled}
            aria-label="Gerar DFD"
          >
            <FileCheck className="w-4 h-4 mr-2" />
            Gerar DFD
          </Button>
        )}
      </div>
    </div>
  )
}
