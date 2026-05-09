'use client'

import { useState, useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useTranslations, useLocale } from 'next-intl'

const rawData = [
  { monthIndex: 0, income: 125000, expenses: 45000 },
  { monthIndex: 1, income: 98000, expenses: 52000 },
  { monthIndex: 2, income: 142000, expenses: 48000 },
  { monthIndex: 3, income: 87000, expenses: 61000 },
  { monthIndex: 4, income: 156000, expenses: 55000 },
  { monthIndex: 5, income: 112000, expenses: 42000 },
  { monthIndex: 6, income: 178000, expenses: 68000 },
  { monthIndex: 7, income: 145000, expenses: 52000 },
  { monthIndex: 8, income: 132000, expenses: 58000 },
  { monthIndex: 9, income: 165000, expenses: 47000 },
  { monthIndex: 10, income: 198000, expenses: 63000 },
  { monthIndex: 11, income: 215000, expenses: 72000 },
]

const TIME_RANGE_KEYS = ['6M', '1Y', '3Y', 'Max'] as const

const formatYAxis = (value: number) => {
  if (value >= 1000) return `€${(value / 1000).toFixed(0)}k`
  return `€${value}`
}

interface TooltipPayload {
  value: number
  dataKey: string
  color: string
}

function CustomTooltip({
  active,
  payload,
  label,
  incomeLabel,
  expensesLabel,
  locale,
}: {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
  incomeLabel: string
  expensesLabel: string
  locale: string
}) {
  if (!active || !payload?.length) return null
  const labels: Record<string, string> = { income: incomeLabel, expenses: expensesLabel }
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <p className="text-sm font-medium text-foreground mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground capitalize">
            {labels[entry.dataKey] ?? entry.dataKey}:
          </span>
          <span className="font-medium text-foreground">
            €{entry.value.toLocaleString(locale)}
          </span>
        </div>
      ))}
    </div>
  )
}

export function IncomeExpenseChart() {
  const [activeRange, setActiveRange] = useState('1Y')
  const t = useTranslations('dashboard.chart')
  const locale = useLocale()

  const monthlyData = useMemo(
    () =>
      rawData.map((d) => ({
        month: new Intl.DateTimeFormat(locale, { month: 'short' }).format(
          new Date(2024, d.monthIndex, 1)
        ),
        income: d.income,
        expenses: d.expenses,
      })),
    [locale]
  )

  const incomeLabel = t('income')
  const expensesLabel = t('expenses')

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{t('title')}</h3>
          <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          {TIME_RANGE_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setActiveRange(key)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeRange === key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t(`timeRanges.${key}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.72 0.17 162)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.72 0.17 162)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.76 0.15 75)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.76 0.15 75)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.004 90)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'oklch(0.45 0.014 261)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'oklch(0.45 0.014 261)', fontSize: 12 }}
              tickFormatter={formatYAxis}
              dx={-10}
            />
            <Tooltip
              content={
                <CustomTooltip
                  incomeLabel={incomeLabel}
                  expensesLabel={expensesLabel}
                  locale={locale}
                />
              }
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingBottom: 20 }}
              formatter={(value: string) => (
                <span className="text-sm text-muted-foreground capitalize">
                  {value === 'income' ? incomeLabel : expensesLabel}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="oklch(0.72 0.17 162)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="oklch(0.76 0.15 75)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
