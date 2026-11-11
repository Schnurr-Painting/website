import {createDataAttribute, stegaClean} from 'next-sanity'
import {projectId, dataset} from './env'

// Same Studio the text click-to-edit markers point to (lib/sanity/client.ts)
const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://schnurr-painting.sanity.studio'

/**
 * Click-to-edit for photos in the Studio's Visual Editor.
 *
 * Text gets click-to-edit automatically (invisible markers inside the
 * words), but a photo is just a URL, so it has to be tagged by hand: put
 * the returned value on the element as `data-sanity={editAttr(doc, 'field')}`.
 * Clicking that element in the Visual Editor then opens that field.
 *
 * `doc` needs the document's _id and _type (the queries include them).
 * `path` is the field, e.g. 'heroImage', 'hero.image',
 * 'gallery[_key=="abc123"]'. Outside the Visual Editor the attribute
 * does nothing.
 */
export function editAttr(
  doc: {_id?: string; _type?: string} | null | undefined,
  path: string,
): string | undefined {
  if (!doc?._id || !doc?._type) return undefined
  const id = stegaClean(doc._id).replace(/^drafts\./, '')
  return createDataAttribute({
    id,
    type: stegaClean(doc._type),
    path,
    baseUrl: studioUrl,
    projectId,
    dataset,
  }).toString()
}
