'use client'

import { Bell, Search } from 'lucide-react'

export function DashboardHeader() {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header className="h-16 px-8 flex items-center justify-between border-b border-border bg-card">
      {/* Left side */}
      <div>
        <p className="text-sm text-muted-foreground capitalize">{today}</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-64 pl-10 pr-4 py-2 rounded-full bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
        </button>

        {/* User avatar */}
        <button className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <span className="text-sm font-medium">MG</span>
        </button>
      </div>
    </header>
  )
}
