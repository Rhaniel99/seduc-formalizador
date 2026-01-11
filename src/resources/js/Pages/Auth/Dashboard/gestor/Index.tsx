import { PageHeader } from '../components/PageHeader'
import { DashboardCard } from '../components/DashboardCard'
import { Users, BarChart3, UserCheck, UserX } from 'lucide-react'
import { MOCK_USERS } from '@/Data/mockData'
import { Head } from '@inertiajs/react'
import { appRoutes } from '@/Routes/app.routes'

export function DashboardGestor() {
  const totalUsers = MOCK_USERS.length
  const activeUsers = MOCK_USERS.filter(u => u.active).length
  const inactiveUsers = MOCK_USERS.filter(u => !u.active).length

  return (
    <>
      <Head title="Dashboard Gestor" />

      <div className="h-full bg-gray-50">
        <PageHeader
          title="Dashboard Gestor"
          description="Gestão de usuários e visão geral do sistema"
        />

        <div className="p-8 space-y-8">
          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Total de Usuários"
              value={totalUsers}
              icon={Users}
              iconColor="var(--institutional-blue)"
            />

            <DashboardCard
              title="Usuários Ativos"
              value={activeUsers}
              icon={UserCheck}
              iconColor="#16a34a"
            />

            <DashboardCard
              title="Usuários Inativos"
              value={inactiveUsers}
              icon={UserX}
              iconColor="#dc2626"
            />
          </div>

          {/* Ações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard
              title="Gestão de Usuários"
              description="Criar, editar e gerenciar usuários"
              icon={Users}
              iconColor="var(--institutional-blue)"
              href={appRoutes.users.index()}
            >
              <p className="text-sm text-gray-600 mt-2">
                Gerencie permissões e status de usuários do sistema
              </p>
            </DashboardCard>

            <DashboardCard
              title="Relatórios de Usuários"
              description="Métricas e exportação relacionadas a usuários"
              icon={BarChart3}
              iconColor="var(--institutional-blue)"
              href={appRoutes.reports.index()} // placeholder
            >
              <p className="text-sm text-gray-600 mt-2">
                Visualize métricas e exporte relatórios sobre usuários
              </p>
            </DashboardCard>
          </div>

          {/* Distribuição por Perfil */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4">
              Distribuição de Usuários por Perfil
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Requisitantes</p>
                <p className="text-3xl text-gray-900">
                  {MOCK_USERS.filter(u => u.role === 'requisitante').length}
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">DETIN</p>
                <p className="text-3xl text-gray-900">
                  {MOCK_USERS.filter(u => u.role === 'detin').length}
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Gestores</p>
                <p className="text-3xl text-gray-900">
                  {MOCK_USERS.filter(u => u.role === 'gestor').length}
                </p>
              </div>
            </div>
          </div>

          {/* Informações */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg text-gray-900 mb-2">
              Informações Importantes
            </h3>

            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Gestores possuem acesso total à gestão de usuários.</li>
              <li>• Usuários desativados perdem acesso imediatamente.</li>
              <li>• Cada perfil possui permissões específicas.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
