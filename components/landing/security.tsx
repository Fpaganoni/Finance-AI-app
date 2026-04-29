import { Shield, Lock, FileCheck, Building2 } from 'lucide-react'

const securityFeatures = [
  {
    icon: Lock,
    title: 'Cifrado de extremo a extremo',
    description: 'AES-256 en reposo y TLS 1.3 en tránsito. Sus datos solo son legibles por usted.',
  },
  {
    icon: Shield,
    title: 'Conexiones de solo lectura',
    description: 'Nunca almacenamos credenciales bancarias. Acceso vía OAuth seguro con tokens revocables.',
  },
  {
    icon: FileCheck,
    title: 'Auditoría SOC 2 Tipo II',
    description: 'Infraestructura certificada y revisada anualmente por auditores independientes.',
  },
  {
    icon: Building2,
    title: 'Custodia segregada',
    description: 'Sus activos permanecen siempre en su entidad. Aurum nunca toca su capital.',
  },
]

export function Security() {
  return (
    <section id="seguridad" className="py-24 px-6 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left column - Header and Vault */}
          <div>
            <span className="text-sm font-medium tracking-widest text-accent uppercase">
              Seguridad
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif leading-tight">
              Protección de grado
              <br />
              <span className="italic text-accent">institucional.</span>
            </h2>
            <p className="mt-6 text-primary-foreground/70 text-lg leading-relaxed max-w-md">
              Diseñado desde el primer día con los estándares más exigentes de
              la banca privada. Su privacidad y la de su patrimonio son
              innegociables.
            </p>

            {/* Vault card */}
            <div className="mt-12 bg-sidebar-accent rounded-2xl p-8 max-w-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-accent" />
                </div>
                <span className="text-xs font-medium tracking-widest text-accent uppercase">
                  Bóveda Aurum
                </span>
                <span className="mt-2 text-xl font-medium text-primary-foreground">
                  256-bit · Zero Knowledge
                </span>
              </div>
            </div>
          </div>

          {/* Right column - Features grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {securityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-sidebar-accent rounded-xl p-6 hover:bg-sidebar-accent/80 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-sidebar-accent border border-primary-foreground/20 flex items-center justify-center mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground/60" />
                </div>
                <h3 className="font-semibold text-primary-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-primary-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
