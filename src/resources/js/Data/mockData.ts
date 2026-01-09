import { Demand } from "@/Types/Demand/Demand";
import { User } from "@/Types/User";

export const MOCK_DEMANDS: Demand[] = [
  {
    id: '1',
    number: 'DFD-2026-001',
    title: 'Contratação de Software de Gestão Escolar',
    requestingArea: 'Departamento de Gestão Escolar',
    responsible: 'GEYSE COUTO JACQUIMINOUT',
    responsibleMatricula: '218741-8C',
    type: 'servico_continuado',
    nature: 'contratacao',
    technicalArea: 'desenvolvimento',
    urgency: 'alta',
    description: 'Contratação de serviços de gestão e monitoramento da execução de despesas pelas Unidades Executoras através da disponibilização e cessão de direito de uso de Software no formato (SaaS – Software as a Service), software especializado para as UEx integradas ao sistema contemplando configuração, parametrização, implantação, treinamento, hospedagem e manutenção da tecnologia.',
    status: 'a_iniciar',
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-05'),
    createdBy: '1',
    statusHistory: [
      {
        status: 'rascunho',
        changedBy: '1',
        changedAt: new Date('2026-01-05T08:00:00'),
      },
      {
        status: 'a_iniciar',
        changedBy: '1',
        changedAt: new Date('2026-01-05T10:30:00'),
      },
    ],
  },
  {
    id: '2',
    number: 'DFD-2026-002',
    title: 'Aquisição de Notebooks para Coordenadores Pedagógicos',
    requestingArea: 'Coordenação Pedagógica',
    responsible: 'Ana Cristina dos Santos Bentes',
    responsibleMatricula: '134312-2C',
    type: 'equipamento_permanente',
    nature: 'aquisicao',
    technicalArea: 'infraestrutura',
    urgency: 'media',
    description: 'Aquisição de 50 notebooks com configuração mínima Intel Core i5, 8GB RAM, SSD 256GB para uso dos coordenadores pedagógicos das escolas estaduais.',
    status: 'em_andamento',
    createdAt: new Date('2026-01-03'),
    updatedAt: new Date('2026-01-07'),
    createdBy: '1',
    sigedLink: 'https://siged.am.gov.br/processo/2026001234',
    notes: 'Processo em análise pela comissão de licitação',
    statusHistory: [
      {
        status: 'rascunho',
        changedBy: '1',
        changedAt: new Date('2026-01-03T09:00:00'),
      },
      {
        status: 'a_iniciar',
        changedBy: '1',
        changedAt: new Date('2026-01-03T11:00:00'),
      },
      {
        status: 'em_andamento',
        changedBy: '2',
        changedAt: new Date('2026-01-07T14:00:00'),
        notes: 'Processo encaminhado para licitação',
      },
    ],
  },
  {
    id: '3',
    number: 'DFD-2026-003',
    title: 'Manutenção de Servidores do Data Center',
    requestingArea: 'Departamento de TI',
    responsible: 'Carlos Mendes Silva',
    responsibleMatricula: '145623-1A',
    type: 'servico_nao_continuado',
    nature: 'manutencao',
    technicalArea: 'infraestrutura',
    urgency: 'critica',
    description: 'Manutenção preventiva e corretiva dos servidores Dell PowerEdge do data center principal, incluindo substituição de componentes com defeito e atualização de firmware.',
    status: 'concluida',
    createdAt: new Date('2025-12-20'),
    updatedAt: new Date('2026-01-02'),
    createdBy: '1',
    sigedLink: 'https://siged.am.gov.br/processo/2025009876',
    statusHistory: [
      {
        status: 'rascunho',
        changedBy: '1',
        changedAt: new Date('2025-12-20T10:00:00'),
      },
      {
        status: 'a_iniciar',
        changedBy: '1',
        changedAt: new Date('2025-12-20T14:00:00'),
      },
      {
        status: 'em_andamento',
        changedBy: '2',
        changedAt: new Date('2025-12-22T08:00:00'),
      },
      {
        status: 'concluida',
        changedBy: '2',
        changedAt: new Date('2026-01-02T16:00:00'),
        notes: 'Manutenção concluída com sucesso',
      },
    ],
  },
  {
    id: '4',
    number: 'DFD-2026-004',
    title: 'Licenças Microsoft 365 para Servidores',
    requestingArea: 'Recursos Humanos',
    responsible: 'Patricia Oliveira Lima',
    responsibleMatricula: '167234-5B',
    type: 'servico_continuado',
    nature: 'contratacao',
    technicalArea: 'suporte',
    urgency: 'alta',
    description: 'Contratação de 200 licenças Microsoft 365 Business Premium para servidores da SEDUC-AM, incluindo Word, Excel, PowerPoint, Teams e 1TB de armazenamento OneDrive.',
    status: 'a_iniciar',
    createdAt: new Date('2026-01-06'),
    updatedAt: new Date('2026-01-06'),
    createdBy: '1',
    statusHistory: [
      {
        status: 'rascunho',
        changedBy: '1',
        changedAt: new Date('2026-01-06T09:00:00'),
      },
      {
        status: 'a_iniciar',
        changedBy: '1',
        changedAt: new Date('2026-01-06T15:00:00'),
      },
    ],
  },
  {
    id: '5',
    number: 'DFD-2026-005',
    title: 'Implementação de Sistema de Backup em Nuvem',
    requestingArea: 'Departamento de TI',
    responsible: 'Roberto Santos Moraes',
    responsibleMatricula: '189456-3C',
    type: 'servico_continuado',
    nature: 'contratacao',
    technicalArea: 'seguranca',
    urgency: 'alta',
    description: 'Contratação de serviço de backup em nuvem para dados críticos da SEDUC-AM, com replicação automática, criptografia e SLA de 99.9% de disponibilidade.',
    status: 'rascunho',
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-08'),
    createdBy: '1',
    statusHistory: [
      {
        status: 'rascunho',
        changedBy: '1',
        changedAt: new Date('2026-01-08T10:00:00'),
      },
    ],
  },
];

export const AREA_OPTIONS = [
  'Departamento de Gestão Escolar',
  'Coordenação Pedagógica',
  'Departamento de TI',
  'Recursos Humanos',
  'Departamento Financeiro',
  'Departamento de Infraestrutura',
  'Gabinete do Secretário',
];

export const TYPE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'material_consumo', label: 'Material de Consumo' },
  { value: 'equipamento_permanente', label: 'Equipamento/Material Permanente' },
  { value: 'servico_continuado', label: 'Serviço Continuado' },
  { value: 'servico_nao_continuado', label: 'Serviço Não Continuado' },
  { value: 'obra', label: 'Obra' },
  { value: 'servico_engenharia', label: 'Serviço de Engenharia' },
];

export const NATURE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'contratacao', label: 'Contratação' },
  { value: 'aquisicao', label: 'Aquisição' },
  { value: 'manutencao', label: 'Manutenção' },
];

export const TECHNICAL_AREA_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'infraestrutura', label: 'Infraestrutura' },
  { value: 'desenvolvimento', label: 'Desenvolvimento' },
  { value: 'suporte', label: 'Suporte' },
  { value: 'seguranca', label: 'Segurança' },
  { value: 'redes', label: 'Redes' },
  { value: 'banco_dados', label: 'Banco de Dados' },
];

export const URGENCY_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'baixa', label: 'Baixa' },
  { value: 'media', label: 'Média' },
  { value: 'alta', label: 'Alta' },
  { value: 'critica', label: 'Crítica' },
];


export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'João Silva',
    role: 'requisitante',
    email: 'joao.silva@educacao.am.gov.br',
    active: true,
  },
  {
    id: '2',
    name: 'Maria Santos',
    role: 'detin',
    email: 'maria.santos@educacao.am.gov.br',
    active: true,
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    role: 'gestor',
    email: 'carlos.oliveira@educacao.am.gov.br',
    active: true,
  },
  {
    id: '4',
    name: 'Ana Costa',
    role: 'requisitante',
    email: 'ana.costa@educacao.am.gov.br',
    active: false,
  },
];
