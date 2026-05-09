'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch: only render after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a placeholder with the same dimensions to prevent layout shift
    return (
      <div className="flex items-center gap-1.5 opacity-0 pointer-events-none" aria-hidden>
        <Sun className="h-3.5 w-3.5" />
        <Switch />
        <Moon className="h-3.5 w-3.5" />
      </div>
    )
  }

  const isDark = theme === 'dark'

  return (
    <div className="flex items-center gap-1.5" title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
      <Sun
        className={`h-3.5 w-3.5 transition-colors ${
          isDark ? 'text-muted-foreground' : 'text-accent'
        }`}
      />
      <Switch
        id="theme-toggle"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        aria-label="Alternar modo oscuro"
      />
      <Moon
        className={`h-3.5 w-3.5 transition-colors ${
          isDark ? 'text-accent' : 'text-muted-foreground'
        }`}
      />
    </div>
  )
}
