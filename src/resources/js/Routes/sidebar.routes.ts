import { appRoutes } from "./app.routes"

export const sidebarRoutes = {
//   dashboard: appRoutes.dashboard,
  dashboard: appRoutes.dashboard.index,

  'nova-demanda': appRoutes.demand.create,

  // ainda não existem → fallback temporário
  'minhas-demandas': () => '#',
  'gestao-demandas': () => '#',
  relatorios: () => '#',
  usuarios: () => '#',
} as const

export type SidebarRouteKey = keyof typeof sidebarRoutes
