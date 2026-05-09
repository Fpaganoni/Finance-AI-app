import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Linkedin, Instagram } from 'lucide-react'

export async function Footer() {
  const t = await getTranslations('footer')

  const footerLinks = {
    product: [
      { key: 'integration', href: '#integracion' },
      { key: 'security', href: '#seguridad' },
      { key: 'predictiveAI', href: '#precios' },
      { key: 'changelog', href: '#' },
    ],
    company: [
      { key: 'about', href: '#acerca' },
      { key: 'team', href: '#' },
      { key: 'press', href: '#' },
      { key: 'careers', href: '#' },
    ],
    legal: [
      { key: 'privacy', href: '#' },
      { key: 'terms', href: '#' },
      { key: 'compliance', href: '#' },
      { key: 'soc2', href: '#' },
    ],
  }

  return (
    <footer id="acerca" className="py-16 px-6 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-accent text-lg font-medium">▲</span>
              <span className="text-lg font-medium text-foreground">Aurum</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
              {t('columns.product')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground hover:text-accent transition-colors"
                  >
                    {t(`links.product.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
              {t('columns.company')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground hover:text-accent transition-colors"
                  >
                    {t(`links.company.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
              {t('columns.legal')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground hover:text-accent transition-colors"
                  >
                    {t(`links.legal.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t('copyright')}</p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
