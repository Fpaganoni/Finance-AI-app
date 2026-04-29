import Link from 'next/link'
import { Button } from '@/components/ui/button'

const pressLogos = ['FORBES', 'BLOOMBERG', 'FINANCIAL TIMES', 'THE ECONOMIST']

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card mb-8">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="text-sm text-muted-foreground">
          Por invitación · Para patrimonios desde €5M
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-center max-w-4xl">
        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight">
          La gestión patrimonial,
        </span>
        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-accent leading-tight">
          reimaginada con inteligencia.
        </span>
      </h1>

      {/* Subheadline */}
      <p className="mt-8 text-center max-w-2xl text-muted-foreground text-lg leading-relaxed">
        Aurum unifica todas sus cuentas, inversiones y activos en una sola
        interfaz. Decisiones más claras, respaldadas por IA predictiva.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12"
        >
          <Link href="/dashboard">Solicitar acceso privado</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full px-8 h-12 border-border hover:bg-secondary"
        >
          <Link href="/dashboard">Ver demostración →</Link>
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
