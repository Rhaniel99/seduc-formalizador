import { Label } from '@/Components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
import {
  TYPE_OPTIONS,
  NATURE_OPTIONS,
  TECHNICAL_AREA_OPTIONS,
  URGENCY_OPTIONS,
} from '@/Data/mockData'
import { UrgencyBadge } from '@/Pages/Auth/Dashboard/components/UrgencyBadge'
import { StepProps } from '@/Types/Demand'

export default function StepClassification({
  data,
  errors,
  onChange,
}: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl text-gray-900 mb-4">
        Etapa 2: Classificação
      </h2>

      {/* Tipo */}
      <div className="space-y-2">
        <Label>Tipo da Demanda *</Label>
        <Select
          value={data.type}
          onValueChange={value => onChange('type', value)}
        >
          <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            {TYPE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-red-600">{errors.type}</p>
        )}
      </div>

      {/* Natureza */}
      <div className="space-y-2">
        <Label>Natureza *</Label>
        <Select
          value={data.nature}
          onValueChange={value => onChange('nature', value)}
        >
          <SelectTrigger className={errors.nature ? 'border-red-500' : ''}>
            <SelectValue placeholder="Selecione a natureza" />
          </SelectTrigger>
          <SelectContent>
            {NATURE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.nature && (
          <p className="text-sm text-red-600">{errors.nature}</p>
        )}
      </div>

      {/* Área Técnica */}
      <div className="space-y-2">
        <Label>Área Técnica Relacionada *</Label>
        <Select
          value={data.technicalArea}
          onValueChange={value => onChange('technicalArea', value)}
        >
          <SelectTrigger
            className={errors.technicalArea ? 'border-red-500' : ''}
          >
            <SelectValue placeholder="Selecione a área técnica" />
          </SelectTrigger>
          <SelectContent>
            {TECHNICAL_AREA_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.technicalArea && (
          <p className="text-sm text-red-600">
            {errors.technicalArea}
          </p>
        )}
      </div>

      {/* Urgência */}
      <div className="space-y-2">
        <Label>Grau de Urgência *</Label>
        <Select
          value={data.urgency}
          onValueChange={value => onChange('urgency', value)}
        >
          <SelectTrigger className={errors.urgency ? 'border-red-500' : ''}>
            <SelectValue placeholder="Selecione a urgência" />
          </SelectTrigger>
          <SelectContent>
            {URGENCY_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.urgency && (
          <p className="text-sm text-red-600">{errors.urgency}</p>
        )}

        {data.urgency && (
          <div className="mt-2">
            <UrgencyBadge urgency={data.urgency as any} />
          </div>
        )}
      </div>
    </div>
  )
}
