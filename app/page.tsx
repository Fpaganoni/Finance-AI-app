import { Header } from '@/components/landing/header'
import { Hero } from '@/components/landing/hero'
import { Integration } from '@/components/landing/integration'
import { Security } from '@/components/landing/security'
import { Pricing } from '@/components/landing/pricing'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Integration />
      <Security />
      <Pricing />
      <Footer />
    </main>
  )
}
