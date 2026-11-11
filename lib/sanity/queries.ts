import {sanityFetch} from './client'

// NOTE: every query goes through sanityFetch (lib/sanity/client.ts). It
// applies {cache: 'no-store'} — Next.js's App Router caches fetch() calls
// indefinitely by default, so without it Sanity edits would never show up —
// and switches to drafts + click-to-edit markers in preview mode.

// --- Site Settings -----------------------------------------------------

export async function getSiteSettings() {
  return sanityFetch(
    `
    *[_type == "brandTheme"][0]{
      "brand": {
        "logo": brand.logo.asset->url,
        "logoAlt": brand.logoAlt
      },
      theme
    }
  `,
    {})
}

export async function getSiteFooter() {
  return sanityFetch(`*[_type == "siteFooter"][0]{tagline, contact, social}`, {})
}

export async function getSharedLabels() {
  return sanityFetch(`*[_type == "sharedLabels"][0]`, {})
}

// Small dedicated query so pages that only need the "Request a Bid" modal
// copy (i.e. every page, via SitePage) don't have to fetch the entire
// Home page document.
export async function getRequestBidSection() {
  return sanityFetch(`*[_type == "homePage"][0].requestBidSection`, {})
}

// --- Home Page -----------------------------------------------------------

export async function getHomePage() {
  return sanityFetch(
    `
    *[_type == "homePage"][0]{
      title,
      seoDescription,
      hero{
        eyebrow, headingLine1, headingLine2, headingLine3, intro,
        backgroundColor, headingColor, introColor, eyebrowColor, headingFont,
        "slides": slides[]{"image": image.asset->url + "?w=1920&auto=format&fit=max", imagePosition}
      },
      servicesSection,
      marketsSection,
      projectsSection,
      testimonialsSection,
      requestBidSection
    }
  `,
    {})
}

// --- Standard Pages (Services, Markets, Projects, Resources, About,
//     Safety, Careers, Contact) -------------------------------------------

const PAGE_TYPE_MAP: Record<string, string> = {
  services: 'servicesPage',
  markets: 'marketsPage',
  projects: 'projectsPage',
  resources: 'resourcesPage',
  about: 'aboutPage',
  safety: 'safetyPage',
  careers: 'careersPage',
  contact: 'contactPage',
  privacy: 'privacyPage',
  terms: 'termsPage',
}

export async function getPage(name: keyof typeof PAGE_TYPE_MAP) {
  const type = PAGE_TYPE_MAP[name]
  if (!type) throw new Error(`Unknown page "${name}"`)

  return sanityFetch(
    `
    *[_type == $type][0]{
      title,
      seoDescription,
      "updatedAt": _updatedAt,
      hero{
        eyebrow, title, intro,
        "image": image.asset->url + "?w=1920&auto=format&fit=max",
        imagePosition, backgroundColor, overlayColor, overlayOpacity,
        headingColor, introColor, accentColor, headingFont
      },
      body,
      story,
      storyImage{
        "url": image.asset->url + "?w=1200&auto=format&fit=max",
        name,
        title
      },
      sections,
      certifications,
      sitePractices,
      coordination,
      safetyContact,
      safetyDocument{
        label,
        "file": file.asset->url,
        externalUrl
      }
    }
  `,
    {type})
}

// Bottom-of-page CTA band — one per page type (Home, Services/Markets/
// Projects), shown on every individual entry of that type (or once, for Home).
const DETAIL_CTA_TYPE_MAP: Record<string, string> = {
  home: 'homePage',
  services: 'servicesPage',
  markets: 'marketsPage',
  projects: 'projectsPage',
}

export async function getDetailCta(name: keyof typeof DETAIL_CTA_TYPE_MAP) {
  const type = DETAIL_CTA_TYPE_MAP[name]
  if (!type) throw new Error(`Unknown detail CTA page "${name}"`)

  return sanityFetch(
    `
    *[_type == $type][0].detailCta{
      eyebrow, heading,
      backgroundColor, eyebrowColor, headingColor,
      buttonColor, buttonTextColor, phoneColor
    }
  `,
    {type})
}
