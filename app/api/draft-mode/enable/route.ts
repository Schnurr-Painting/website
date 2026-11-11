import {validatePreviewUrl} from '@sanity/preview-url-secret'
import {perspectiveCookieName} from '@sanity/preview-url-secret/constants'
import {cookies, draftMode} from 'next/headers'
import {redirect} from 'next/navigation'
import {previewClient} from '@/lib/sanity/client'

// Called by the Studio's Visual Editor to switch this browser into preview
// mode (drafts + click-to-edit). The Studio passes a one-time secret that is
// checked against the dataset, so only signed-in editors can turn it on.
//
// Same as next-sanity's defineEnableDraftMode, plus `partitioned` cookies:
// inside the Studio this site is an embedded (third-party) page, and
// browsers increasingly drop ordinary third-party cookies there. Partitioned
// ("CHIPS") cookies are allowed, so preview mode reliably switches on.
export async function GET(request: Request) {
  const {isValid, redirectTo = '/', studioPreviewPerspective} = await validatePreviewUrl(
    previewClient,
    request.url,
  )
  if (!isValid) return new Response('Invalid secret', {status: 401})

  const store = draftMode()
  if (!store.isEnabled) store.enable()

  const jar = cookies()
  const secure = process.env.NODE_ENV === 'production'
  const options = {
    httpOnly: true,
    path: '/',
    secure,
    sameSite: secure ? ('none' as const) : ('lax' as const),
    partitioned: secure,
  }
  jar.set({name: '__prerender_bypass', value: jar.get('__prerender_bypass')?.value || '', ...options})
  if (studioPreviewPerspective) {
    jar.set({name: perspectiveCookieName, value: studioPreviewPerspective, ...options})
  }
  redirect(redirectTo)
}
