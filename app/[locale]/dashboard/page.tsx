import { getTranslations } from 'next-intl/server'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { NetWorthCard } from '@/components/dashboard/net-worth-card'
import { QuickStats } from '@/components/dashboard/quick-stats'
import { IncomeExpenseChart } from '@/components/dashboard/income-expense-chart'
import { AssetCards } from '@/components/dashboard/asset-cards'
import { AIAdvisor } from '@/components/dashboard/ai-advisor'

export default async function DashboardPage() {
  const t = await getTranslations('dashboard')
  const userName = 'María'

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <div className="flex-1 p-8 relative">
        <div className="max-w-6xl space-y-6">
          <div className="mb-2">
            <h1 className="text-2xl font-serif text-foreground">
              {t.rich('welcome', {
                name: () => <span className="text-accent">{userName}</span>,
              })}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t('subtitle')}
            </p>
          </div>

          <NetWorthCard
            totalValue={8580000}
            change={125400}
            changePercent={1.48}
          />

          <QuickStats />

          <div className="grid lg:grid-cols-2 gap-6">
            <IncomeExpenseChart />
            <AssetCards />
          </div>
        </div>

        <div className="fixed bottom-6 right-6 z-50">
          <AIAdvisor />
        </div>
      </div>
    </div>
  )
}
