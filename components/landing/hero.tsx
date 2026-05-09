import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'

const pressLogos = ['FORBES', 'BLOOMBERG', 'FINANCIAL TIMES', 'THE ECONOMIST']

export async function Hero() {
  const t = await getTranslations('hero')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card mb-8">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="text-sm text-muted-foreground">{t('badge')}</span>
      </div>

      {/* Headline */}
      <h1 className="text-center max-w-4xl">
        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight">
          {t('headline1')}
        </span>
        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-accent leading-tight">
          {t('headline2')}
        </span>
      </h1>

      {/* Subheadline */}
      <p className="mt-8 text-center max-w-2xl text-muted-foreground text-lg leading-relaxed">
        {t('subheadline')}
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12"
        >
          <Link href="/dashboard">{t('cta1')}</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full px-8 h-12 border-border hover:bg-secondary"
        >
          <Link href="/dashboard">{t('cta2')}</Link>
        </Button>
      </div>

      {/* Press logos */}
      <div className="mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
        {pressLogos.map((logo) => (
          <span
            key={logo}
            className="text-xs sm:text-sm tracking-widest text-muted-foreground/60 font-medium"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  )
}
