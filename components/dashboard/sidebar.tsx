'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  PieChart,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react'

export function DashboardSidebar() {
  const t = useTranslations('dashboard.sidebar')
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard' as const, labelKey: 'nav.overview', icon: LayoutDashboard },
    { href: '/dashboard/activos' as const, labelKey: 'nav.assets', icon: Wallet },
    { href: '/dashboard/inversiones' as const, labelKey: 'nav.investments', icon: TrendingUp },
    { href: '/dashboard/analisis' as const, labelKey: 'nav.analysis', icon: PieChart },
  ]

  const bottomItems = [
    { href: '/dashboard/configuracion' as const, labelKey: 'bottom.settings', icon: Settings },
    { href: '/dashboard/ayuda' as const, labelKey: 'bottom.help', icon: HelpCircle },
  ]

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
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href)
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
                  {t(item.labelKey)}
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
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {t('bottom.logout')}
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
              {t('user.name')}
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              {t('user.plan')}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
