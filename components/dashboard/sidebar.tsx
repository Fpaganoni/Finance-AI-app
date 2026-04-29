'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  PieChart,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Resumen', icon: LayoutDashboard },
  { href: '/dashboard/activos', label: 'Activos', icon: Wallet },
  { href: '/dashboard/inversiones', label: 'Inversiones', icon: TrendingUp },
  { href: '/dashboard/analisis', label: 'Análisis', icon: PieChart },
]

const bottomItems = [
  { href: '/dashboard/configuracion', label: 'Configuración', icon: Settings },
  { href: '/dashboard/ayuda', label: 'Ayuda', icon: HelpCircle },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="h-16 px-6 flex items-center border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sidebar-primary text-lg font-medium">▲</span>
          <span className="text-lg font-medium text-sidebar-foreground">Aurum</span>
        </Link>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom navigation */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <ul className="space-y-1">
          {bottomItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </div>

      {/* User profile */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sm font-medium text-sidebar-foreground">MG</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              María García
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              IA Predictiva
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
