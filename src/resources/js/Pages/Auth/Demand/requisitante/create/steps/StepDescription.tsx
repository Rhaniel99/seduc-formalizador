import { Label } from '@/Components/ui/label'
import { Textarea } from '@/Components/ui/textarea'
import { StepProps } from '@/Types/Demand'

export default function StepDescription({
  data,
  errors,
  onChange,
}: StepProps) {
  const length = data.description?.length ?? 0

  return (
    <div className="space-y-6">
      <h2 className="text-xl text-gray-900 mb-4">
        Etapa 3: Descrição da Necessidade
      </h2>

      <div className="space-y-2">
        <Label>Descrição Detalhada *</Label>
        <Textarea
          rows={10}
          value={data.description ?? ''}
          onChange={e => onChange('description', e.target.value)}
          placeholder="Descreva de forma clara e completa a necessidade..."
          className={errors.description ? 'border-red-500' : ''}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {length} caracteres (mínimo: 50)
          </p>
          {errors.description && (
            <p className="text-sm text-red-600">
              {errors.description}
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm text-gray-900 mb-2">
          Orientações para uma boa descrição:
        </h4>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Explique claramente o problema ou necessidade</li>
          <li>• Justifique a importância da solicitação</li>
          <li>• Descreva os benefícios esperados</li>
          <li>• Indique prazos e especificações técnicas</li>
          <li>• Mencione impactos caso não seja atendida</li>
        </ul>
      </div>
    </div>
  )
}
