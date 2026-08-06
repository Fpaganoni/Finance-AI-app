'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { LanguageSwitcher } from '@/components/language-switcher'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations('header')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#integracion', label: t('nav.integration') },
    { href: '#seguridad', label: t('nav.security') },
    { href: '#precios', label: t('nav.pricing') },
    { href: '#acerca', label: t('nav.about') },
  ]

  return (
    <header
      className={cn(
        'fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out',
        scrolled ? 'top-3 w-[min(94%,64rem)]' : 'top-0 w-full'
      )}
    >
      <nav
        className={cn(
          'mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-500 ease-out',
          scrolled
            ? 'rounded-full border border-border/60 bg-card/70 backdrop-blur-xl shadow-[0_8px_30px_-12px_oklch(0.13_0.028_261/0.35)]'
            : 'border-b border-border/50 bg-background/80 backdrop-blur-md'
        )}
      >
        <div className={cn('flex items-center justify-between transition-all duration-500', scrolled ? 'h-12' : 'h-16')}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-accent text-lg font-medium">▲</span>
            <span className="text-lg font-medium text-foreground">Aurum</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <ModeToggle />
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('login')}
            </Link>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5">
              <Link href="/dashboard">{t('requestAccess')}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t('theme')}</span>
                  <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <ModeToggle />
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('login')}
                </Link>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                  <Link href="/dashboard">{t('requestAccess')}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
