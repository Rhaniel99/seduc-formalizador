export type UserRole = 'requisitante' | 'detin' | 'gestor' | 'dev';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  isDev?: boolean;
  email?: string;
  active?: boolean;
}