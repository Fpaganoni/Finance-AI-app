'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { LanguageSwitcher } from '@/components/language-switcher'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations('header')

  const navLinks = [
    { href: '#integracion', label: t('nav.integration') },
    { href: '#seguridad', label: t('nav.security') },
    { href: '#precios', label: t('nav.pricing') },
    { href: '#acerca', label: t('nav.about') },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
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
