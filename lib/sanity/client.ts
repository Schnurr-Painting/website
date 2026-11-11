import {createClient, type QueryParams} from 'next-sanity'
import {draftMode} from 'next/headers'
import {projectId, dataset, apiVersion} from './env'

export {projectId, dataset, apiVersion}

// Where click-to-edit links point. Overridable so a test Studio can be used.
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://schnurr-painting.sanity.studio'

// Read token (Viewer role) — server-only. Needed to show unpublished drafts
// in preview mode. Set as SANITY_API_READ_TOKEN in Netlify (secret).
const readToken = process.env.SANITY_API_READ_TOKEN

// Values that drive layout or logic rather than being shown as text. These
// must never carry the invisible click-to-edit markers ("stega") that
// preview mode adds to strings, or colors, links and filters would break.
const NON_TEXT = /(color|font|position|opacity|slug|current|showon|visibility|icon|email|phone|href|url|seodescription|roletype|employmenttype)/i

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Sanity's CDN caches published content and is fast + free.
  // We disable it in development so you see edits immediately.
  useCdn: process.env.NODE_ENV === 'production',
  stega: {
    enabled: false, // only switched on per-request in preview mode (below)
    studioUrl,
    filter: (props) => {
      const path = props.sourcePath.map((p) => (typeof p === 'object' ? '' : String(p)))
      const last = path[path.length - 1] || ''
      if (NON_TEXT.test(last)) return false
      // Internal fields (_id, _type, _key) are used for photo click-to-edit
      if (last.startsWith('_')) return false
      // Brand & Theme values are all colors/fonts used in CSS
      if (path.includes('theme')) return false
      return props.filterDefault(props)
    },
  },
})

/**
 * Every content query goes through here.
 *
 * Normal visitors: published content only, exactly as before.
 * Preview mode (opened from the Studio's Presentation view): drafts are
 * shown and every text value carries click-to-edit markers.
 */
function isPreview(): boolean {
  if (!readToken) return false
  try {
    return draftMode().isEnabled
  } catch {
    // Called outside a request (e.g. generateStaticParams at build time)
    return false
  }
}

export async function sanityFetch<T = any>(query: string, params: QueryParams = {}): Promise<T> {
  if (isPreview()) {
    return client.fetch<T>(query, params, {
      perspective: 'previewDrafts',
      token: readToken,
      useCdn: false,
      stega: true,
      cache: 'no-store',
    })
  }
  // NOTE: {cache: 'no-store'} — Next.js's App Router caches fetch() calls
  // indefinitely by default; without this, edits made in Sanity would never
  // show up on the site without a full server restart.
  return client.fetch<T>(query, params, {cache: 'no-store'})
}

/** Client with the read token, for the draft-mode route only. */
export const previewClient = client.withConfig({token: readToken, useCdn: false})
