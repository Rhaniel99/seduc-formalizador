import { Alert, AlertDescription } from '@/Components/ui/alert'
import { UrgencyBadge } from '@/Pages/Auth/Dashboard/components/UrgencyBadge'
import {
  TYPE_OPTIONS,
  NATURE_OPTIONS,
  TECHNICAL_AREA_OPTIONS,
} from '@/Data/mockData'
import { StepProps } from '@/Types/Demand'

export default function StepReview({ data }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl text-gray-900 mb-4">
        Etapa 4: Revisão
      </h2>

      <Alert className="bg-yellow-50 border-yellow-300">
        <AlertDescription className="text-gray-900">
          <strong>Atenção:</strong> Após gerar o DFD, a demanda não poderá
          ser editada. Revise cuidadosamente.
        </AlertDescription>
      </Alert>

      {/* Identificação */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm text-gray-500 mb-2">Identificação</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Título:</strong> {data.title}</p>
          <p><strong>Área Solicitante:</strong> {data.requestingArea}</p>

          <div>
            <strong>Responsáveis:</strong>
            <ul className="list-disc list-inside mt-1">
              {data.responsibles?.map((r, i) => (
                <li key={i}>
                  {r.name} – {r.registrationNumber}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Classificação */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm text-gray-500 mb-2">Classificação</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Tipo:</strong>{' '}
            {TYPE_OPTIONS.find(t => t.value === data.type)?.label}
          </p>
          <p>
            <strong>Natureza:</strong>{' '}
            {NATURE_OPTIONS.find(n => n.value === data.nature)?.label}
          </p>
          <p>
            <strong>Área Técnica:</strong>{' '}
            {
              TECHNICAL_AREA_OPTIONS.find(
                a => a.value === data.technicalArea
              )?.label
            }
          </p>
          <p className="flex items-center gap-2">
            <strong>Urgência:</strong>
            {data.urgency && (
              <UrgencyBadge urgency={data.urgency as any} />
            )}
          </p>
        </div>
      </div>

      {/* Descrição */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm text-gray-500 mb-2">Descrição</h3>
        <p className="text-sm whitespace-pre-wrap">
          {data.description}
        </p>
      </div>
    </div>
  )
}
