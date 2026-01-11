import { Label } from '@/Components/ui/label'
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { AREA_OPTIONS } from '@/Data/mockData'
import { ResponsiblesField } from '../components/ResponsiblesField'
import { DemandFormData } from '@/Types/Demand/Demand'

type Props = {
    data: Partial<DemandFormData>
    errors: Record<string, string>
    onChange: (field: keyof DemandFormData, value: any) => void
    onAddResponsible: () => void
    onRemoveResponsible: (index: number) => void
    onChangeResponsible: (
        index: number,
        field: 'name' | 'registrationNumber',
        value: string
    ) => void
}

export default function StepIdentification({
    data,
    errors,
    onChange,
    onAddResponsible,
    onRemoveResponsible,
    onChangeResponsible,
}: Props) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl text-gray-900 mb-4">Etapa 1: Identificação</h2>
            <div className="space-y-2">
                <Label htmlFor="title">Título da Demanda *</Label>
                <Input
                    id="title"
                    value={data.title || ''}
                    onChange={e => onChange('title', e.target.value)}

                    placeholder="Ex: Contratação de Software de Gestão Escolar"
                    className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="requestingArea">Área Solicitante *</Label>
                <Select
                    value={data.requestingArea}
                    onValueChange={value => onChange('requestingArea', value)}

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
            <ResponsiblesField
                responsibles={data.responsibles ?? []}
                onAdd={onAddResponsible}
                onRemove={onRemoveResponsible}
                onChange={onChangeResponsible}
            />
        </div>
    )
}
