export const appRoutes = {
  dashboard: () => route('dashboard'),

  demand: {
    create: () => route('demand.create'),
    mine: () => route('demand.mine'),
    edit: (id: string) => route('demand.edit', id),
  },

  users: {
    index: () => route('users.index'),
  },
} as const
