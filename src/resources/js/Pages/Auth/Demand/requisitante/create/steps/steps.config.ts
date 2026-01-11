import StepIdentification from './StepIdentification'
import StepClassification from './StepClassification'
import StepDescription from './StepDescription'
import StepReview from './StepReview'

export const DEMAND_STEPS = [
  {
    id: 1,
    title: 'Identificação',
    description: 'Dados básicos da demanda',
    Component: StepIdentification,
  },
  {
    id: 2,
    title: 'Classificação',
    description: 'Tipo e natureza',
    Component: StepClassification,
  },
  {
    id: 3,
    title: 'Descrição',
    description: 'Detalhamento da necessidade',
    Component: StepDescription,
  },
  {
    id: 4,
    title: 'Revisão',
    description: 'Confirme as informações',
    Component: StepReview,
  },
] as const
