import { getTranslations } from 'next-intl/server'
import { Shield, Lock, FileCheck, Building2 } from 'lucide-react'

const featureIcons = [Lock, Shield, FileCheck, Building2]
const featureKeys = ['encryption', 'readOnly', 'audit', 'custody'] as const

export async function Security() {
  const t = await getTranslations('security')

  return (
    <section id="seguridad" className="py-24 px-6 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left column */}
          <div>
            <span className="text-sm font-medium tracking-widest text-accent uppercase">
              {t('badge')}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif leading-tight">
              {t('headline1')}
              <br />
              <span className="italic text-accent">{t('headline2')}</span>
            </h2>
            <p className="mt-6 text-primary-foreground/70 text-lg leading-relaxed max-w-md">
              {t('description')}
            </p>

            {/* Vault card */}
            <div className="mt-12 bg-sidebar-accent rounded-2xl p-8 max-w-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-accent" />
                </div>
                <span className="text-xs font-medium tracking-widest text-accent uppercase">
                  {t('vaultLabel')}
                </span>
                <span className="mt-2 text-xl font-medium text-primary-foreground">
                  {t('vaultSpec')}
                </span>
              </div>
            </div>
          </div>

          {/* Right column - Features grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {featureKeys.map((key, index) => {
              const Icon = featureIcons[index]
              return (
                <div
                  key={key}
                  className="bg-sidebar-accent rounded-xl p-6 hover:bg-sidebar-accent/80 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-sidebar-accent border border-primary-foreground/20 flex items-center justify-center mb-4">
                    <div className="w-2 h-2 rounded-full bg-primary-foreground/60" />
                  </div>
                  <h3 className="font-semibold text-primary-foreground mb-2">
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="text-sm text-primary-foreground/60 leading-relaxed">
                    {t(`features.${key}.description`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
