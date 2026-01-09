// routes/Sidebar.routes.ts
export const sidebarRoutes = {
  dashboard: '/dashboard',
  'nova-demanda': '/preview/nova-demanda',
  'minhas-demandas': '/preview/minhas-demandas',
  'gestao-demandas': '/preview/gestao-demandas',
  relatorios: '/preview/relatorios',
  usuarios: '/preview/usuarios',
} as const;

export type SidebarRouteKey = keyof typeof sidebarRoutes;
