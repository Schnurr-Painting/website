import {draftMode} from 'next/headers'
import {NextResponse, type NextRequest} from 'next/server'

// Leaves preview mode and returns to the normal (published) site.
export function GET(request: NextRequest) {
  draftMode().disable()
  return NextResponse.redirect(new URL('/', request.url))
}
