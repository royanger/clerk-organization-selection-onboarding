import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const isOrgListRoute = createRouteMatcher(["/organization-selection"])
const isPublicRoute = createRouteMatcher(["/", "/organization-selection"])

export default clerkMiddleware((auth, req: NextRequest) => {

  // is user is signed in and visiting org selection, let them view
  if (auth().userId && isOrgListRoute(req)) {
    return NextResponse.next()
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!auth().userId && !isPublicRoute(req))
    return auth().redirectToSignIn({ returnBackUrl: req.url });


  // Check if the user is signed in and does not have an auth().orgId
  // If true, then redirect them to the organization selection route
  // Include their current route as a redirect_url, which will be handled on the route
  if (auth().userId && !auth().orgId) {
    const redirectUrl = req.nextUrl.href
    const orgListUrl = new URL(`/organization-selection?redirect_url=${redirectUrl}`, req.url)
    return NextResponse.redirect(orgListUrl)
  }

  // If the user is logged in and the route is protected, let them view.
  if (auth().userId && !isPublicRoute(req)) return NextResponse.next();
})

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
