import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Detect locale from URL path
  const detectedLocale = routing.locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )

  if (detectedLocale) {
    // Inject locale as request header so root layout can read it
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-next-intl-locale', detectedLocale)

    const intlResponse = handleI18nRouting(request)
    // Honor any redirect from intl middleware
    if (intlResponse.status !== 200) return intlResponse

    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  // No locale in URL — let next-intl handle detection + redirect
  return handleI18nRouting(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
