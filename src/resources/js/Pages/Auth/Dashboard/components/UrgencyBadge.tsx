import { AlertCircle, AlertTriangle, Info, Zap } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';
import { DemandUrgency } from '@/Types/Demand/Demand';

interface UrgencyBadgeProps {
    urgency: DemandUrgency;
    showIcon?: boolean;
    className?: string;
}

export function UrgencyBadge({ urgency, showIcon = true, className }: UrgencyBadgeProps) {
    const urgencyConfig: Record<DemandUrgency, { label: string; color: string; icon: typeof Info }> = {
        baixa: { label: 'Baixa', color: 'bg-gray-100 text-gray-700 border-gray-300', icon: Info },
        media: { label: 'Média', color: 'bg-blue-100 text-blue-700 border-blue-300', icon: AlertCircle },
        alta: { label: 'Alta', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', icon: AlertTriangle },
        critica: { label: 'Crítica', color: 'bg-red-100 text-red-700 border-red-300', icon: Zap },
    };

    const config = urgencyConfig[urgency];
    const Icon = config.icon;

    return (
        <Badge
            variant="outline"
            className={`${config.color} border ${className}`}
        >
            {showIcon && <Icon className="w-3 h-3 mr-1" />}
            {config.label}
        </Badge>
    );
}
