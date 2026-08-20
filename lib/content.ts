import {client} from './sanity/client'

export interface ContentEntry<T = Record<string, any>> {
  id: string
  data: T
  // Raw Portable Text (Sanity's rich text format) — render with
  // components/RichBody.tsx, which wraps @portabletext/react.
  body: any[]
}

// Maps the old Decap collection folder names to Sanity document types.
const TYPE_MAP: Record<string, string> = {
  projects: 'project',
  services: 'service',
  markets: 'market',
  team: 'teamMember',
  testimonials: 'testimonial',
  stats: 'stat',
  resources: 'resource',
  positions: 'position',
}

// Project/Service/Market use a real slug field (matches the old filename).
// The others don't have a public detail page, so we just use the doc _id.
const SLUG_TYPES = new Set(['project', 'service', 'market'])

const PROJECTIONS: Record<string, string> = {
  project: `title, market, location, "featuredImage": featuredImage.asset->url, "gallery": gallery[].asset->url, shortDescription, gc, owner, projectSize, completionDate, services, featured, sortOrder, heroStyle, body`,
  service: `title, shortDescription, "heroImage": heroImage.asset->url, icon, featured, sortOrder, heroStyle, body`,
  market: `title, shortDescription, "cardImage": cardImage.asset->url, "heroImage": heroImage.asset->url, icon, accentColor, featured, sortOrder, heroStyle, body`,
  teamMember: `name, role, "headshot": headshot.asset->url, email, phone, bio, displayOrder, publicProfile`,
  testimonial: `quote, person, role, company, "companyLogo": companyLogo.asset->url, project, approvedPublic, showOn, sortOrder`,
  stat: `value, label, description, showOn, sortOrder`,
  resource: `title, resourceType, description, "file": file.asset->url, externalUrl, visibility, icon, sortOrder`,
  position: `title, roleType, employmentType, location, requirements, active, sortOrder, body`,
}

function resolveType(collectionName: string): string {
  const type = TYPE_MAP[collectionName]
  if (!type) throw new Error(`Unknown collection "${collectionName}"`)
  return type
}

// NOTE the third argument: {cache: 'no-store'}. Next.js's App Router
// caches fetch() calls indefinitely by default — without this, edits made
// in Sanity would never show up on the site without a full server restart.
export async function getCollection<T = Record<string, any>>(
  collectionName: string
): Promise<ContentEntry<T>[]> {
  const type = resolveType(collectionName)
  const idExpr = SLUG_TYPES.has(type) ? '"id": slug.current,' : '"id": _id,'
  const query = `*[_type == "${type}"]{ ${idExpr} ${PROJECTIONS[type]} }`
  const docs = await client.fetch(query, {}, {cache: 'no-store'})
  return docs.map((doc: any) => {
    const {id, body, ...rest} = doc
    return {id, data: rest as T, body: body || []}
  })
}

export async function getEntry<T = Record<string, any>>(
  collectionName: string,
  id: string
): Promise<ContentEntry<T> | null> {
  const type = resolveType(collectionName)
  const filter = SLUG_TYPES.has(type) ? 'slug.current == $id' : '_id == $id'
  const query = `*[_type == "${type}" && ${filter}][0]{ ${PROJECTIONS[type]} }`
  const doc = await client.fetch(query, {id}, {cache: 'no-store'})
  if (!doc) return null
  const {body, ...rest} = doc
  return {id, data: rest as T, body: body || []}
}
