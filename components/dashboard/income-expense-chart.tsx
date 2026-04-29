'use client'

import { useState } from 'react'
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

const monthlyData = [
  { month: 'Ene', ingresos: 125000, gastos: 45000 },
  { month: 'Feb', ingresos: 98000, gastos: 52000 },
  { month: 'Mar', ingresos: 142000, gastos: 48000 },
  { month: 'Abr', ingresos: 87000, gastos: 61000 },
  { month: 'May', ingresos: 156000, gastos: 55000 },
  { month: 'Jun', ingresos: 112000, gastos: 42000 },
  { month: 'Jul', ingresos: 178000, gastos: 68000 },
  { month: 'Ago', ingresos: 145000, gastos: 52000 },
  { month: 'Sep', ingresos: 132000, gastos: 58000 },
  { month: 'Oct', ingresos: 165000, gastos: 47000 },
  { month: 'Nov', ingresos: 198000, gastos: 63000 },
  { month: 'Dic', ingresos: 215000, gastos: 72000 },
]

const timeRanges = ['6M', '1A', '3A', 'Max']

const formatYAxis = (value: number) => {
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}k`
  }
  return `€${value}`
}

interface TooltipPayload {
  value: number
  dataKey: string
  color: string
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground capitalize">
              {entry.dataKey}:
            </span>
            <span className="font-medium text-foreground">
              €{entry.value.toLocaleString('es-ES')}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function IncomeExpenseChart() {
  const [activeRange, setActiveRange] = useState('1A')

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Flujos Mensuales</h3>
          <p className="text-sm text-muted-foreground">Ingresos vs. gastos</p>
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeRange === range
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.72 0.17 162)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.72 0.17 162)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
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
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingBottom: 20 }}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground capitalize">{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="ingresos"
              stroke="oklch(0.72 0.17 162)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIngresos)"
            />
            <Area
              type="monotone"
              dataKey="gastos"
              stroke="oklch(0.76 0.15 75)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGastos)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
