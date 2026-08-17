import createImageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'
import {projectId, dataset} from './client'

const builder = createImageUrlBuilder({projectId: projectId!, dataset})

// Usage: urlFor(someImageField).width(800).url()
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
