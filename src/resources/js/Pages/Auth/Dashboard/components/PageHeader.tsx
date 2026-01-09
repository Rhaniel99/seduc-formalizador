import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/Components/ui/button';

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
        icon?: LucideIcon;
    };
    children?: ReactNode;
}

export function PageHeader({ title, description, action, children }: PageHeaderProps) {
    return (
        <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl text-gray-900">{title}</h1>
                    {description && (
                        <p className="text-sm text-gray-600 mt-1">{description}</p>
                    )}
                </div>
                {action && (
                    <Button
                        onClick={action.onClick}
                        style={{ backgroundColor: 'var(--institutional-blue)' }}
                    >
                        {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                        {action.label}
                    </Button>
                )}
                {children}
            </div>
        </div>
    );
}
