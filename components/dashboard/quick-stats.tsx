'use client'

import { TrendingUp, TrendingDown, RefreshCw, Shield } from 'lucide-react'

interface Stat {
  label: string
  value: string
  change?: number
  icon: React.ElementType
  iconColor: string
}

const stats: Stat[] = [
  {
    label: 'Rentabilidad YTD',
    value: '+12.4%',
    change: 2.1,
    icon: TrendingUp,
    iconColor: 'text-success',
  },
  {
    label: 'Ratio Sharpe',
    value: '1.85',
    icon: Shield,
    iconColor: 'text-accent',
  },
  {
    label: 'Última sincronización',
    value: 'Hace 2 min',
    icon: RefreshCw,
    iconColor: 'text-muted-foreground',
  },
]

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-border p-4 flex items-center gap-4"
          >
            <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                {stat.change !== undefined && (
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${
                    stat.change >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(stat.change)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
