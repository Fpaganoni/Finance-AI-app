'use client'

import { useTranslations } from 'next-intl'

const banks = [
  { id: 'jpm', name: 'JP Morgan', short: 'JPM', balance: '€2,840,210' },
  { id: 'ubs', name: 'UBS Wealth', short: 'UW', balance: '€1,205,750' },
  { id: 'bbva', name: 'BBVA Privada', short: 'BP', balance: '€680,420' },
  { id: 'santander', name: 'Santander PB', short: 'SP', balance: '€1,920,000' },
]

const orbitBanks = [
  { name: 'JPM', position: 'top' },
  { name: 'STD', position: 'left' },
  { name: 'UBS', position: 'right' },
  { name: 'BBVA', position: 'bottom' },
]

export function Integration() {
  const t = useTranslations('integration')

  return (
    <section id="integracion" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-xl mb-16">
          <span className="text-sm font-medium tracking-widest text-accent uppercase">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif text-foreground leading-tight">
            {t('headline1')}
            <br />
            <span className="italic text-accent">{t('headline2')}</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Integration visualization */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Orbit diagram */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
              <div className="absolute inset-0 rounded-full border border-border/50" />
              <div className="absolute inset-8 rounded-full border border-border/30" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary flex items-center justify-center shadow-2xl">
                <span className="text-primary-foreground font-medium text-lg">Aurum</span>
              </div>

              {orbitBanks.map((bank) => {
                const positions = {
                  top: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
                  right: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
                  bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
                  left: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
                }
                return (
                  <div
                    key={bank.name}
                    className={`absolute ${positions[bank.position as keyof typeof positions]} w-16 h-16 rounded-full bg-card border border-border shadow-lg flex items-center justify-center`}
                  >
                    <span className="text-sm font-medium text-foreground">{bank.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Account list */}
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm text-muted-foreground">{t('synced')}</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">{t('currency')}</span>
            </div>

            <div className="divide-y divide-border">
              {banks.map((bank) => (
                <div key={bank.id} className="px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium text-muted-foreground">{bank.short}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{bank.name}</p>
                      <p className="text-sm text-muted-foreground">{t('privateAccount')}</p>
                    </div>
                  </div>
                  <span className="font-medium text-foreground">{bank.balance}</span>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-border bg-secondary/30 flex items-center justify-between">
              <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                {t('totalWealth')}
              </span>
              <span className="text-xl font-semibold text-foreground">€6,646,380</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
