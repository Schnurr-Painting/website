import {defineEnableDraftMode} from 'next-sanity/draft-mode'
import {previewClient} from '@/lib/sanity/client'

// Called by the Studio's Presentation view to switch this browser into
// preview mode (drafts + click-to-edit). The Studio passes a one-time
// secret that is checked against the dataset, so only signed-in editors
// can turn preview mode on.
export const {GET} = defineEnableDraftMode({client: previewClient})
