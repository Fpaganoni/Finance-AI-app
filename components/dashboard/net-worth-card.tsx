'use client'

import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react'

interface NetWorthCardProps {
  totalValue: number
  change: number
  changePercent: number
}

export function NetWorthCard({ totalValue, change, changePercent }: NetWorthCardProps) {
  const isPositive = change >= 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatChange = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return sign + new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Patrimonio Neto Total
          </p>
          <p className="mt-2 text-5xl font-serif text-foreground tracking-tight">
            {formatCurrency(totalValue)}
          </p>
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-sm text-foreground hover:bg-secondary/80 transition-colors">
          Ver detalles
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
          isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {formatChange(change)} este mes
        </p>
      </div>
    </div>
  )
}
