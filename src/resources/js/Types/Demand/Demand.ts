export type DemandStatus = 'rascunho' | 'a_iniciar' | 'em_andamento' | 'concluida' | 'cancelada';

export type DemandType = 'material_consumo' | 'equipamento_permanente' | 'servico_continuado' | 'servico_nao_continuado' | 'obra' | 'servico_engenharia';

export type DemandNature = 'contratacao' | 'aquisicao' | 'manutencao';

export type DemandUrgency = 'baixa' | 'media' | 'alta' | 'critica';

export type TechnicalArea = 'infraestrutura' | 'desenvolvimento' | 'suporte' | 'seguranca' | 'redes' | 'banco_dados';

export interface Demand {
  id: string;
  number: string;
  title: string;
  requestingArea: string;
  responsible: string;
  responsibleMatricula: string;
  type: DemandType;
  nature: DemandNature;
  technicalArea: TechnicalArea;
  urgency: DemandUrgency;
  description: string;
  status: DemandStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  sigedLink?: string;
  notes?: string;
  statusHistory: StatusChange[];
}

export interface StatusChange {
  status: DemandStatus;
  changedBy: string;
  changedAt: Date;
  notes?: string;
}

export interface DemandFormData {
  title: string;
  requestingArea: string;
  responsible: string;
  responsibleMatricula: string;
  type: DemandType;
  nature: DemandNature;
  technicalArea: TechnicalArea;
  urgency: DemandUrgency;
  description: string;
}
