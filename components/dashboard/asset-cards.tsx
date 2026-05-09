'use client'

import { Banknote, Bitcoin, LineChart, Building2, Gem, Car } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface AssetDef {
  id: string
  nameKey: string
  icon: React.ElementType
  value: number
  change: number
  color: string
}

const assetDefs: AssetDef[] = [
  { id: 'cash', nameKey: 'cash', icon: Banknote, value: 1250000, change: 2.5, color: 'bg-success/10 text-success' },
  { id: 'crypto', nameKey: 'crypto', icon: Bitcoin, value: 485000, change: -4.2, color: 'bg-accent/10 text-accent' },
  { id: 'stocks', nameKey: 'stocks', icon: LineChart, value: 2890000, change: 8.3, color: 'bg-chart-5/10 text-chart-5' },
  { id: 'real-estate', nameKey: 'realEstate', icon: Building2, value: 3450000, change: 1.2, color: 'bg-chart-3/10 text-chart-3' },
  { id: 'collectibles', nameKey: 'collectibles', icon: Gem, value: 320000, change: 5.8, color: 'bg-chart-4/10 text-chart-4' },
  { id: 'vehicles', nameKey: 'vehicles', icon: Car, value: 185000, change: -2.1, color: 'bg-muted text-muted-foreground' },
]

export function AssetCards() {
  const t = useTranslations('dashboard.assets')
  const locale = useLocale()

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{t('title')}</h3>
          <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
        </div>
        <button className="text-sm text-accent hover:underline">{t('viewAll')}</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {assetDefs.map((asset) => {
          const Icon = asset.icon
          const isPositive = asset.change >= 0

          return (
            <div
              key={asset.id}
              className="p-4 rounded-xl border border-border hover:border-accent/50 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div
                className={`w-10 h-10 rounded-lg ${asset.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <p className="text-sm text-muted-foreground mb-1">
                {t(`names.${asset.nameKey}`)}
              </p>
              <p className="text-lg font-semibold text-foreground mb-2">
                {formatCurrency(asset.value)}
              </p>

              <div
                className={`inline-flex items-center gap-1 text-xs font-medium ${
                  isPositive ? 'text-success' : 'text-destructive'
                }`}
              >
                <span>{isPositive ? '↑' : '↓'}</span>
                <span>{Math.abs(asset.change).toFixed(1)}%</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
