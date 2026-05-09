import { getTranslations } from 'next-intl/server'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

const planKeys = ['essentials', 'predictive', 'familyOffice'] as const
const highlightedPlan = 'predictive'

export async function Pricing() {
  const t = await getTranslations('pricing')

  return (
    <section id="precios" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-widest text-accent uppercase">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif text-foreground leading-tight">
            {t('headline1')}
            <br />
            <span className="italic text-accent">{t('headline2')}</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            {t.rich('description', {
              u: (chunks) => (
                <span className="underline decoration-accent underline-offset-4">{chunks}</span>
              ),
            })}
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {planKeys.map((key) => {
            const highlighted = key === highlightedPlan
            const features = t.raw(`plans.${key}.features`) as string[]

            return (
              <div
                key={key}
                className={`relative rounded-2xl p-8 ${
                  highlighted
                    ? 'bg-card border-2 border-accent shadow-xl'
                    : 'bg-card border border-border'
                }`}
              >
                {highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full uppercase tracking-wider">
                    {t('recommended')}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(`plans.${key}.name`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`plans.${key}.description`)}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-serif text-foreground">
                    {t(`plans.${key}.price`)}
                  </span>
                  <span className="text-muted-foreground">
                    {t(`plans.${key}.period`)}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          highlighted ? 'text-success' : 'text-muted-foreground'
                        }`}
                      />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full rounded-full ${
                    highlighted
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border'
                  }`}
                >
                  <Link href="/dashboard">{t(`plans.${key}.cta`)}</Link>
                </Button>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          {t('footerNote')}
        </p>
      </div>
    </section>
  )
}
