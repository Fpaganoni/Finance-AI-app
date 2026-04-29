import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { NetWorthCard } from '@/components/dashboard/net-worth-card'
import { QuickStats } from '@/components/dashboard/quick-stats'
import { IncomeExpenseChart } from '@/components/dashboard/income-expense-chart'
import { AssetCards } from '@/components/dashboard/asset-cards'
import { AIAdvisor } from '@/components/dashboard/ai-advisor'

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      
      <div className="flex-1 p-8 relative">
        {/* Main content grid */}
        <div className="max-w-6xl space-y-6">
          {/* Welcome message */}
          <div className="mb-2">
            <h1 className="text-2xl font-serif text-foreground">
              Buenos días, <span className="text-accent">María</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Aquí tiene el resumen de su patrimonio
            </p>
          </div>

          {/* Net worth card */}
          <NetWorthCard
            totalValue={8580000}
            change={125400}
            changePercent={1.48}
          />

          {/* Quick stats */}
          <QuickStats />

          {/* Charts and assets row */}
          <div className="grid lg:grid-cols-2 gap-6">
            <IncomeExpenseChart />
            <AssetCards />
          </div>
        </div>

        {/* AI Advisor - Fixed position */}
        <div className="fixed bottom-6 right-6 z-50">
          <AIAdvisor />
        </div>
      </div>
    </div>
  )
}
