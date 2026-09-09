import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

/**
 * Allorca is archived and no longer accepts sign-ups, so the app itself has to
 * be viewable without an account. The pages below render demo data when there
 * is no session (see src/lib/demo.ts).
 *
 * The /api routes are deliberately NOT public: they spend the Anthropic and
 * Finnhub keys, so they stay behind auth and the demo uses fixtures instead.
 */
const isPublicRoute = createRouteMatcher([
  '/',
  '/home',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/dashboard',
  '/portfolio',
  '/education(.*)',
  '/onboarding',
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // txt and xml are excluded so /robots.txt is served as a static file
    // rather than being swallowed by the auth middleware.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|txt|xml)).*)',
    '/(api|trpc)(.*)',
  ],
}
