import {createClient} from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Sanity's CDN caches published content and is fast + free.
  // We disable it in development so you see edits immediately.
  useCdn: process.env.NODE_ENV === 'production',
})
