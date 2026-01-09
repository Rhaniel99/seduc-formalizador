import { PageHeader } from '../components/PageHeader';
import { DashboardCard } from '../components/DashboardCard';
import { FileText, Clock, CheckCircle2, PlayCircle, BarChart3, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MOCK_DEMANDS } from '@/Data/mockData';
import { sidebarRoutes } from '@/Layouts/Sidebar/routes/Sidebar.routes';
import { Head } from '@inertiajs/react';


export function DashboardDetin() {
  const totalDemands = MOCK_DEMANDS.length;
  const toStart = MOCK_DEMANDS.filter(d => d.status === 'a_iniciar').length;
  const inProgress = MOCK_DEMANDS.filter(d => d.status === 'em_andamento').length;
  const completed = MOCK_DEMANDS.filter(d => d.status === 'concluida').length;

  // Dados para gráfico por área técnica
  const demandsByArea = MOCK_DEMANDS.reduce((acc, demand) => {
    const area = demand.technicalArea;
    acc[area] = (acc[area] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const areaChartData = Object.entries(demandsByArea).map(([area, count]) => ({
    area: area === 'infraestrutura' ? 'Infraestrutura' :
          area === 'desenvolvimento' ? 'Desenvolvimento' :
          area === 'suporte' ? 'Suporte' :
          area === 'seguranca' ? 'Segurança' :
          area === 'redes' ? 'Redes' : 'Banco de Dados',
    quantidade: count,
  }));

  // Dados para gráfico por status
  const statusData = [
    { status: 'Rascunho', quantidade: MOCK_DEMANDS.filter(d => d.status === 'rascunho').length },
    { status: 'A Iniciar', quantidade: toStart },
    { status: 'Em Andamento', quantidade: inProgress },
    { status: 'Concluída', quantidade: completed },
    { status: 'Cancelada', quantidade: MOCK_DEMANDS.filter(d => d.status === 'cancelada').length },
  ];

  return (
    <>
    <Head title="Dashboard Detin" />
    
    
    <div className="h-full bg-gray-50">
      <PageHeader
        title="Dashboard DETIN"
        description="Visão gerencial de todas as demandas de TI"
      />
      
      <div className="p-8 space-y-8">
        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total de Demandas"
            value={totalDemands}
            icon={FileText}
            iconColor="var(--institutional-blue)"
            href={sidebarRoutes['gestao-demandas']}
          />

          <DashboardCard
            title="A Iniciar"
            value={toStart}
            icon={PlayCircle}
            iconColor="#0284c7"
          />

          <DashboardCard
            title="Em Andamento"
            value={inProgress}
            icon={Clock}
            iconColor="#eab308"
          />

          <DashboardCard
            title="Concluídas"
            value={completed}
            icon={CheckCircle2}
            iconColor="#16a34a"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico por Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Demandas por Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#1e40af" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico por Área Técnica */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Demandas por Área Técnica</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard
            title="Gestão de Demandas"
            description="Visualizar e gerenciar todas as demandas"
            icon={FileText}
            iconColor="var(--institutional-blue)"
            href={sidebarRoutes['gestao-demandas']}
          >
            <p className="text-sm text-gray-600 mt-2">
              Acesse a lista completa com filtros avançados
            </p>
          </DashboardCard>

          <DashboardCard
            title="Painéis e Relatórios"
            description="Análises detalhadas e exportação"
            icon={BarChart3}
            iconColor="var(--institutional-blue)"
            href={sidebarRoutes['gestao-demandas']}
          >
            <p className="text-sm text-gray-600 mt-2">
              Gere relatórios e visualize métricas avançadas
            </p>
          </DashboardCard>
        </div>
      </div>
    </div>
    </>
  );
}
