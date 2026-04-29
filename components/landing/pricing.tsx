import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const plans = [
  {
    name: 'Essentials',
    description: 'Visibilidad consolidada de su patrimonio.',
    price: '€90',
    period: '/mes',
    features: [
      'Hasta 10 cuentas conectadas',
      'Sincronización diaria',
      'Reportes mensuales en PDF',
      'Soporte por correo',
    ],
    cta: 'Comenzar',
    highlighted: false,
  },
  {
    name: 'IA Predictiva',
    description: 'El motor completo de Aurum, con inteligencia anticipativa.',
    price: '€490',
    period: '/mes',
    features: [
      'Cuentas y custodios ilimitados',
      'Sincronización en tiempo real',
      'Predicciones de IA sobre flujos y mercado',
      'Optimización fiscal automatizada',
      'Asesor patrimonial dedicado',
      'Reportes personalizados ilimitados',
    ],
    cta: 'Solicitar acceso',
    highlighted: true,
  },
  {
    name: 'Family Office',
    description: 'Soluciones para estructuras multigeneracionales.',
    price: 'A medida',
    period: '',
    features: [
      'Multi-entidad y multi-divisa',
      'Gobernanza familiar integrada',
      'Integración con custodios privados',
      'Equipo dedicado 24/7',
    ],
    cta: 'Hablar con ventas',
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="precios" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-widest text-accent uppercase">
            Precios
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif text-foreground leading-tight">
            Un plan para cada
            <br />
            <span className="italic text-accent">estrategia patrimonial.</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            Sin comisiones por activos bajo gestión. Solo{' '}
            <span className="underline decoration-accent underline-offset-4">una tarifa transparente</span>.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-card border-2 border-accent shadow-xl'
                  : 'bg-card border border-border'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full uppercase tracking-wider">
                  Recomendado
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-serif text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-success' : 'text-muted-foreground'}`} />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full rounded-full ${
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border'
                }`}
              >
                <Link href="/dashboard">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Todos los planes incluyen 30 días de prueba sin compromiso · IVA no incluido
        </p>
      </div>
    </section>
  )
}
