'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const locales = [
  { value: 'es', code: 'ES' },
  { value: 'en', code: 'EN' },
] as const

export function LanguageSwitcher() {
  const locale = useLocale()
  const t = useTranslations('common.languageSwitcher')
  const router = useRouter()
  const pathname = usePathname()

  const current = locales.find((l) => l.value === locale) ?? locales[0]

  const handleSwitch = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-0"
        aria-label={t('label')}
      >
        <span className="font-medium tabular-nums">{current.code}</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[130px]">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l.value}
            onClick={() => handleSwitch(l.value)}
            className={cn(
              'flex items-center justify-between cursor-pointer',
              locale === l.value && 'text-accent font-medium'
            )}
          >
            <span>{t(l.value)}</span>
            <span className="text-xs text-muted-foreground font-mono">{l.code}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
