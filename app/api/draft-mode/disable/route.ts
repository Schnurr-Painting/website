import {cookies, draftMode} from 'next/headers'
import {NextResponse, type NextRequest} from 'next/server'

// Leaves preview mode and returns to the normal (published) site.
export function GET(request: NextRequest) {
  draftMode().disable()
  // Also clear the partitioned copy set by the enable route
  cookies().set({name: '__prerender_bypass', value: '', path: '/', maxAge: 0, secure: true, sameSite: 'none', partitioned: true})
  return NextResponse.redirect(new URL('/', request.url))
}
