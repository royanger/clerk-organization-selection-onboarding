import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(["/", "/sign-in", "/sign-up"])

export default clerkMiddleware((auth, req: NextRequest) => {
  const { userId, orgId } = auth()

  // Check if the user is signed in and does not have an auth().orgId
  // If true, then redirect them to the organization selection route
  // Include their current route as a redirect_url, which will be handled on the route
  if (userId && !orgId && req.nextUrl.pathname !== '/organization-selection') {
    const redirectUrl = req.nextUrl.href
    const orgListUrl = new URL(`/organization-selection?redirect_url=${redirectUrl}`, req.url)
    return NextResponse.redirect(orgListUrl)
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req))
    return auth().redirectToSignIn({ returnBackUrl: req.url });

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(req)) return NextResponse.next();
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
