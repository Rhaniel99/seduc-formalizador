import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { ChevronLeft, ChevronRight, Save, FileCheck } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { DemandFormData } from '@/Types/Demand/Demand';
import { AREA_OPTIONS, NATURE_OPTIONS, TECHNICAL_AREA_OPTIONS, TYPE_OPTIONS, URGENCY_OPTIONS } from '@/Data/mockData';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { UrgencyBadge } from '../../components/UrgencyBadge';

interface NovaDemandaProps {
  onNavigate: (page: string, demandId?: string) => void;
}

const STEPS = [
  { id: 1, title: 'Identificação', description: 'Dados básicos da demanda' },
  { id: 2, title: 'Classificação', description: 'Tipo e natureza' },
  { id: 3, title: 'Descrição', description: 'Detalhamento da necessidade' },
  { id: 4, title: 'Revisão', description: 'Confirme as informações' },
];

export function NovaDemanda({ onNavigate }: NovaDemandaProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<DemandFormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: keyof DemandFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando ele é editado
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title?.trim()) newErrors.title = 'Título é obrigatório';
      if (!formData.requestingArea) newErrors.requestingArea = 'Área solicitante é obrigatória';
      if (!formData.responsible?.trim()) newErrors.responsible = 'Responsável é obrigatório';
      if (!formData.responsibleMatricula?.trim()) newErrors.responsibleMatricula = 'Matrícula é obrigatória';
    }

    if (step === 2) {
      if (!formData.type) newErrors.type = 'Tipo da demanda é obrigatório';
      if (!formData.nature) newErrors.nature = 'Natureza é obrigatória';
      if (!formData.technicalArea) newErrors.technicalArea = 'Área técnica é obrigatória';
      if (!formData.urgency) newErrors.urgency = 'Grau de urgência é obrigatório';
    }

    if (step === 3) {
      if (!formData.description?.trim()) newErrors.description = 'Descrição é obrigatória';
      if (formData.description && formData.description.trim().length < 50) {
        newErrors.description = 'Descrição deve ter pelo menos 50 caracteres';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSaveDraft = () => {
    alert('Rascunho salvo com sucesso!');
  };

  const handleGenerateDFD = () => {
    if (validateStep(1) && validateStep(2) && validateStep(3)) {
      // Simular geração do DFD
      const demandId = 'new-demand-id';
      onNavigate('visualizar-dfd', demandId);
    }
  };

  return (
    <div className="h-full bg-gray-50 overflow-auto">
      <PageHeader
        title="Nova Demanda"
        description="Preencha o formulário para formalizar sua demanda de TI"
      />
      
      <div className="p-8">
        {/* Stepper */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      step.id === currentStep
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : step.id < currentStep
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="text-center mt-2">
                    <p className={`text-sm ${step.id === currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400">{step.description}</p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-colors ${
                      step.id < currentStep ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                    style={{ maxWidth: '100px' }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl text-gray-900 mb-4">Etapa 1: Identificação</h2>
              
              <div className="space-y-2">
                <Label htmlFor="title">Título da Demanda *</Label>
                <Input
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="Ex: Contratação de Software de Gestão Escolar"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="requestingArea">Área Solicitante *</Label>
                <Select
                  value={formData.requestingArea}
                  onValueChange={(value) => updateFormData('requestingArea', value)}
                >
                  <SelectTrigger className={errors.requestingArea ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione a área" />
                  </SelectTrigger>
                  <SelectContent>
                    {AREA_OPTIONS.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.requestingArea && <p className="text-sm text-red-600">{errors.requestingArea}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="responsible">Responsável pela Demanda *</Label>
                  <Input
                    id="responsible"
                    value={formData.responsible || ''}
                    onChange={(e) => updateFormData('responsible', e.target.value)}
                    placeholder="Nome completo"
                    className={errors.responsible ? 'border-red-500' : ''}
                  />
                  {errors.responsible && <p className="text-sm text-red-600">{errors.responsible}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibleMatricula">Matrícula *</Label>
                  <Input
                    id="responsibleMatricula"
                    value={formData.responsibleMatricula || ''}
                    onChange={(e) => updateFormData('responsibleMatricula', e.target.value)}
                    placeholder="Ex: 218741-8C"
                    className={errors.responsibleMatricula ? 'border-red-500' : ''}
                  />
                  {errors.responsibleMatricula && <p className="text-sm text-red-600">{errors.responsibleMatricula}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl text-gray-900 mb-4">Etapa 2: Classificação</h2>
              
              <div className="space-y-2">
                <Label htmlFor="type">Tipo da Demanda *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) => updateFormData('type', value)}
                >
                  <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nature">Natureza *</Label>
                <Select
                  value={formData.nature}
                  onValueChange={(value: any) => updateFormData('nature', value)}
                >
                  <SelectTrigger className={errors.nature ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione a natureza" />
                  </SelectTrigger>
                  <SelectContent>
                    {NATURE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.nature && <p className="text-sm text-red-600">{errors.nature}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="technicalArea">Área Técnica Relacionada *</Label>
                <Select
                  value={formData.technicalArea}
                  onValueChange={(value: any) => updateFormData('technicalArea', value)}
                >
                  <SelectTrigger className={errors.technicalArea ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione a área técnica" />
                  </SelectTrigger>
                  <SelectContent>
                    {TECHNICAL_AREA_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.technicalArea && <p className="text-sm text-red-600">{errors.technicalArea}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Grau de Urgência *</Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value: any) => updateFormData('urgency', value)}
                >
                  <SelectTrigger className={errors.urgency ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione a urgência" />
                  </SelectTrigger>
                  <SelectContent>
                    {URGENCY_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.urgency && <p className="text-sm text-red-600">{errors.urgency}</p>}
                {formData.urgency && (
                  <div className="mt-2">
                    <UrgencyBadge urgency={formData.urgency as any} />
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl text-gray-900 mb-4">Etapa 3: Descrição da Necessidade</h2>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição Detalhada *</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Descreva de forma clara e completa a necessidade, incluindo justificativa, objetivos e requisitos..."
                  rows={10}
                  className={errors.description ? 'border-red-500' : ''}
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {formData.description?.length || 0} caracteres (mínimo: 50)
                  </p>
                  {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm text-gray-900 mb-2">Orientações para uma boa descrição:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Explique claramente o problema ou necessidade</li>
                  <li>• Justifique a importância da solicitação</li>
                  <li>• Descreva os benefícios esperados</li>
                  <li>• Indique prazos e especificações técnicas, se houver</li>
                  <li>• Mencione impactos caso a demanda não seja atendida</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl text-gray-900 mb-4">Etapa 4: Revisão</h2>
              
              <Alert className="bg-yellow-50 border-yellow-300">
                <AlertDescription className="text-gray-900">
                  <strong>Atenção:</strong> Após gerar o DFD, a demanda não poderá ser editada. 
                  Revise cuidadosamente todas as informações antes de prosseguir.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm text-gray-500 mb-2">Identificação</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Título:</strong> {formData.title}</p>
                    <p><strong>Área Solicitante:</strong> {formData.requestingArea}</p>
                    <p><strong>Responsável:</strong> {formData.responsible} - {formData.responsibleMatricula}</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm text-gray-500 mb-2">Classificação</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Tipo:</strong> {TYPE_OPTIONS.find(t => t.value === formData.type)?.label}</p>
                    <p><strong>Natureza:</strong> {NATURE_OPTIONS.find(n => n.value === formData.nature)?.label}</p>
                    <p><strong>Área Técnica:</strong> {TECHNICAL_AREA_OPTIONS.find(a => a.value === formData.technicalArea)?.label}</p>
                    <p className="flex items-center gap-2">
                      <strong>Urgência:</strong> 
                      {formData.urgency && <UrgencyBadge urgency={formData.urgency as any} />}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm text-gray-500 mb-2">Descrição</h3>
                  <p className="text-sm whitespace-pre-wrap">{formData.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Botões de Navegação */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div>
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Rascunho
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  style={{ backgroundColor: 'var(--institutional-blue)' }}
                >
                  Próximo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleGenerateDFD}
                  style={{ backgroundColor: 'var(--status-success)' }}
                >
                  <FileCheck className="w-4 h-4 mr-2" />
                  Gerar DFD
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
