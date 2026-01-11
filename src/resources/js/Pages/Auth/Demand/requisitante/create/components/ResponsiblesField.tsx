import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'

export function ResponsiblesField({
  responsibles,
  onAdd,
  onRemove,
  onChange,
}: {
  responsibles: { name: string; registrationNumber: string }[]
  onAdd: () => void
  onRemove: (index: number) => void
  onChange: (
    index: number,
    field: 'name' | 'registrationNumber',
    value: string
  ) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Responsáveis *</Label>
        <Button type="button" size="sm" variant="outline" onClick={onAdd}>
          + Adicionar
        </Button>
      </div>

      {responsibles.map((r, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-4 relative">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Nome completo"
              value={r.name}
              onChange={e => onChange(i, 'name', e.target.value)}
            />
            <Input
              placeholder="Matrícula"
              value={r.registrationNumber}
              onChange={e => onChange(i, 'registrationNumber', e.target.value)}
            />
          </div>

          {i > 0 && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 text-red-600"
              onClick={() => onRemove(i)}
            >
              Remover
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
