import { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Link } from '@inertiajs/react'
import { LucideIcon } from 'lucide-react'

interface DashboardCardProps {
  title: string
  description?: string
  value?: number
  icon?: LucideIcon
  iconColor?: string
  href?: string
  children?: ReactNode
  className?: string
}

export function DashboardCard({
  title,
  description,
  value,
  icon: Icon,
  iconColor = 'var(--institutional-blue)',
  href,
  children,
  className = '',
}: DashboardCardProps) {
  const content = (
    <Card
      className={`${
        href ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
      } ${className}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">
                {description}
              </CardDescription>
            )}
          </div>

          {Icon && (
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${iconColor}15` }}
            >
              <Icon className="w-5 h-5" style={{ color: iconColor }} />
            </div>
          )}
        </div>
      </CardHeader>

      {(value !== undefined || children) && (
        <CardContent>
          {value !== undefined && (
            <p className="text-3xl text-gray-900">{value}</p>
          )}
          {children}
        </CardContent>
      )}
    </Card>
  )

  // 🔑 Se tem href → Inertia Link
  return href ? <Link href={href}>{content}</Link> : content
}
