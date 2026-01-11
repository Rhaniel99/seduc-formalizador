import { Button } from "@/Components/ui/button";
import { useUser } from "@/Hooks/useUser";
import { Link, usePage } from "@inertiajs/react";
import { BarChart3, FilePlus, FileText, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import { PropsWithChildren } from "react";
import { SidebarRouteKey, sidebarRoutes } from "@/Routes/sidebar.routes";

type MenuItem = {
    id: SidebarRouteKey;
    label: string;
    icon: any;
};

export default function SidebarLayout({ children }: PropsWithChildren) {
    const { user, logout } = useUser()
    const { url } = usePage()

    const ALL_MENU_ITEMS: MenuItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'nova-demanda', label: 'Nova Demanda', icon: FilePlus },
        { id: 'minhas-demandas', label: 'Minhas Demandas', icon: FileText },
        { id: 'gestao-demandas', label: 'Gestão de Demandas', icon: FileText },
        { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
        { id: 'usuarios', label: 'Gestão de Usuários', icon: Users },
    ]

    const getMenuItems = (): MenuItem[] => {
        if (!user) return [];

        // 🔓 DEV vê tudo
        if (user.isDev) {
            return ALL_MENU_ITEMS;
        }

        const commonItems: MenuItem[] = [
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        ];

        if (user.role === 'requisitante') {
            return [
                ...commonItems,
                { id: 'nova-demanda', label: 'Nova Demanda', icon: FilePlus },
                { id: 'minhas-demandas', label: 'Minhas Demandas', icon: FileText },
            ];
        }

        if (user.role === 'detin') {
            return [
                ...commonItems,
                { id: 'gestao-demandas', label: 'Gestão de Demandas', icon: FileText },
                { id: 'relatorios', label: 'Painéis e Relatórios', icon: BarChart3 },
            ];
        }

        if (user.role === 'gestor') {
            return [
                ...commonItems,
                { id: 'usuarios', label: 'Gestão de Usuários', icon: Users },
                { id: 'gestao-demandas', label: 'Gestão de Demandas', icon: FileText },
                { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
            ];
        }

        return commonItems;
    };

    const menuItems = getMenuItems();

    const getRoleName = (role: string) => {
        const roleNames: Record<string, string> = {
            requisitante: 'Usuário Requisitante',
            detin: 'Usuário DETIN',
            gestor: 'Gestor de Contas',
        };
        return roleNames[role] || role;
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 flex flex-col" style={{ backgroundColor: 'var(--institutional-blue)' }}>
                {/* Logo e Título */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                            <Settings className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-white text-lg leading-tight">DFD Digital</h1>
                            <p className="text-white/70 text-xs">SEDUC-AM</p>
                        </div>
                    </div>
                </div>

                {/* Menu de Navegação */}
                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        // const href = route(item.id) // ajuste para suas rotas reais
                        // const href = sidebarRoutes[item.id]
                        const href = sidebarRoutes[item.id]()

                        // const isActive = url.startsWith(href)
                          const isActive = href !== '#' && url.startsWith(href)

                        return (
                            <Link
                                key={item.id}
                                href={href}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-white/20 text-white'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
                        onClick={logout}
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sair
                    </Button>
                </div>
            </aside>

            {/* Conteúdo Principal */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white border-b border-gray-200 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl text-gray-900">Sistema de Formalização de Demandas de TI</h2>
                            <p className="text-sm text-gray-500">Secretaria de Estado de Educação e Desporto Escolar</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user && getRoleName(user.role)}</p>
                        </div>
                    </div>
                </header>

                {/* Área de Conteúdo */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}