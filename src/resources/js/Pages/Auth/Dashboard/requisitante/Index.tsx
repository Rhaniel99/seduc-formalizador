import { FilePlus, FileText, Clock, CheckCircle2, PlayCircle } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { DashboardCard } from '../components/DashboardCard';
import { MOCK_DEMANDS } from '@/Data/mockData';
import { useUser } from '@/Hooks/useUser';
import { sidebarRoutes } from '@/Layouts/Sidebar/routes/Sidebar.routes';
import { Head } from '@inertiajs/react';

export function DashboardRequisitante() {
  const { user } = useUser();

  // Filtrar demandas do usuário logado
  const myDemands = MOCK_DEMANDS.filter(d => d.createdBy === user?.id);
  const drafts = myDemands.filter(d => d.status === 'rascunho').length;
  const toStart = myDemands.filter(d => d.status === 'a_iniciar').length;
  const inProgress = myDemands.filter(d => d.status === 'em_andamento').length;
  const completed = myDemands.filter(d => d.status === 'concluida').length;

  return (
    <>
      <Head title="Dashboard Requisitante" />


      <div className="h-full bg-gray-50">
        <PageHeader
          title="Dashboard"
          description="Bem-vindo ao Sistema de Formalização de Demandas de TI"
        />

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Principal - Nova Demanda */}
            <DashboardCard
              title="Nova Demanda"
              description="Criar uma nova solicitação de TI"
              icon={FilePlus}
              iconColor="var(--institutional-blue)"
              href={sidebarRoutes['gestao-demandas']}
              className="border-2 border-blue-200"
            >
              <p className="text-sm text-gray-600 mt-2">
                Clique aqui para iniciar o processo de formalização de uma nova demanda
              </p>
            </DashboardCard>

            {/* Card - Minhas Demandas */}
            <DashboardCard
              title="Minhas Demandas"
              description="Visualizar todas as solicitações"
              value={myDemands.length}
              icon={FileText}
              iconColor="var(--institutional-blue)"
              href={sidebarRoutes['gestao-demandas']}
            />

            {/* Card - Rascunhos */}
            <DashboardCard
              title="Rascunhos"
              description="Demandas não finalizadas"
              value={drafts}
              icon={Clock}
              iconColor="#6b7280"
            />

            {/* Card - A Iniciar */}
            <DashboardCard
              title="A Iniciar"
              description="Aguardando processamento"
              value={toStart}
              icon={PlayCircle}
              iconColor="#0284c7"
            />

            {/* Card - Em Andamento */}
            <DashboardCard
              title="Em Andamento"
              description="Sendo processadas"
              value={inProgress}
              icon={Clock}
              iconColor="#eab308"
            />

            {/* Card - Concluídas */}
            <DashboardCard
              title="Concluídas"
              description="Demandas finalizadas"
              value={completed}
              icon={CheckCircle2}
              iconColor="#16a34a"
            />
          </div>

          {/* Informações Importantes */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg text-gray-900 mb-2">Informações Importantes</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>O DFD (Documento de Formalização de Demanda) é o instrumento oficial para solicitar serviços e recursos de TI.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Após gerar o DFD, a demanda não poderá ser editada. Revise cuidadosamente antes de finalizar.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>O sistema DFD Digital não substitui o SIGED. O processo formal será conduzido pela DETIN através do SIGED.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Você pode salvar rascunhos e retornar posteriormente para concluir o preenchimento.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
