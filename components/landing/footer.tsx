import Link from 'next/link'
import { Linkedin, Instagram } from 'lucide-react'

const footerLinks = {
  producto: [
    { label: 'Integración', href: '#integracion' },
    { label: 'Seguridad', href: '#seguridad' },
    { label: 'IA Predictiva', href: '#precios' },
    { label: 'Cambios', href: '#' },
  ],
  compania: [
    { label: 'Acerca', href: '#acerca' },
    { label: 'Equipo', href: '#' },
    { label: 'Prensa', href: '#' },
    { label: 'Carreras', href: '#' },
  ],
  legal: [
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
    { label: 'Cumplimiento', href: '#' },
    { label: 'SOC 2', href: '#' },
  ],
}

export function Footer() {
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
              Gestión patrimonial inteligente para individuos exigentes y family offices.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
              Producto
            </h4>
            <ul className="space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
              Compañía
            </h4>
            <ul className="space-y-3">
              {footerLinks.compania.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Aurum. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
