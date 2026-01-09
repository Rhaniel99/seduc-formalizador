import { useState } from 'react'
import { useUser } from '@/Hooks/useUser'

// import GestorDashboard from './Gestor'
import { DashboardRequisitante } from './requisitante/Index'
import { DashboardGestor } from './gestor/Index'
import { DashboardDetin } from './detin/Index'
import { Head } from '@inertiajs/react'

type Role = 'requisitante' | 'detin' | 'gestor'

export default function Index() {
  const { user } = useUser()

  // 🔹 Dev começa vendo requisitante
  const [effectiveRole, setEffectiveRole] = useState<Role>('requisitante')

  if (!user) return null

  // 🔒 Usuário normal: papel real
  if (!user.isDev) {
    return renderDashboard(user.role)
  }

  // 🔓 DEV: papel visual
  return (
    <>
    <Head title="Dashboard Dev" />
      {/* 🔧 Dev Toolbar */}
      <div className="mb-4 flex items-center gap-3 p-3 border rounded-lg bg-yellow-50">
        <span className="text-sm font-medium text-yellow-800">
          Visualizar como:
        </span>

        <select
          value={effectiveRole}
          onChange={(e) => setEffectiveRole(e.target.value as Role)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="requisitante">Requisitante</option>
          <option value="detin">DETIN</option>
          <option value="gestor">Gestor</option>
        </select>
      </div>

      {renderDashboard(effectiveRole)}
    </>
  )
}

function renderDashboard(role: string) {
  switch (role) {
    case 'detin':
      return <DashboardDetin />
    case 'gestor':
      return <DashboardGestor />
    case 'requisitante':
    default:
      return <DashboardRequisitante />
  }
}
