export const appRoutes = {
  dashboard: {
    index: () => route('dashboard.index'),
  },

  demand: {
    create: () => route('demand.create'),
    index: () => route('demand.index'),   // gestão de demandas (lista)
    mine: () => '#',     // minhas demandas (requisitante)
    edit: (id: string) => route('demand.edit', id),
  },

  users: {
    index: () => '#',
  },

  reports: {
    index: () => '#', // futura
  },
} as const
