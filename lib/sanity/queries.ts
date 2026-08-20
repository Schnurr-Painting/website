import {client} from './client'

// NOTE the third argument on every client.fetch call below: {cache:
// 'no-store'}. Next.js's App Router caches fetch() calls indefinitely by
// default — without this, edits made in Sanity would never show up on the
// site without a full server restart.

// --- Site Settings -----------------------------------------------------

export async function getSiteSettings() {
  return client.fetch(
    `
    *[_type == "brandTheme"][0]{
      "brand": {
        "logo": brand.logo.asset->url,
        "logoAlt": brand.logoAlt
      },
      theme
    }
  `,
    {},
    {cache: 'no-store'}
  )
}

export async function getSiteFooter() {
  return client.fetch(`*[_type == "siteFooter"][0]{tagline, contact, social}`, {}, {cache: 'no-store'})
}

export async function getSharedLabels() {
  return client.fetch(`*[_type == "sharedLabels"][0]`, {}, {cache: 'no-store'})
}

// Small dedicated query so pages that only need the "Request a Bid" modal
// copy (i.e. every page, via SitePage) don't have to fetch the entire
// Home page document.
export async function getRequestBidSection() {
  return client.fetch(`*[_type == "homePage"][0].requestBidSection`, {}, {cache: 'no-store'})
}

// --- Home Page -----------------------------------------------------------

export async function getHomePage() {
  return client.fetch(
    `
    *[_type == "homePage"][0]{
      title,
      seoDescription,
      hero{
        eyebrow, headingLine1, headingLine2, headingLine3, intro,
        backgroundColor, headingColor, introColor, eyebrowColor, headingFont,
        "slides": slides[]{"image": image.asset->url, imagePosition}
      },
      servicesSection,
      marketsSection,
      projectsSection,
      testimonialsSection,
      requestBidSection
    }
  `,
    {},
    {cache: 'no-store'}
  )
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
}

export async function getPage(name: keyof typeof PAGE_TYPE_MAP) {
  const type = PAGE_TYPE_MAP[name]
  if (!type) throw new Error(`Unknown page "${name}"`)

  return client.fetch(
    `
    *[_type == $type][0]{
      title,
      seoDescription,
      hero{
        eyebrow, title, intro,
        "image": image.asset->url,
        imagePosition, backgroundColor, overlayColor, overlayOpacity,
        headingColor, introColor, accentColor, headingFont
      },
      story,
      storyImage{
        "url": image.asset->url,
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
    {type},
    {cache: 'no-store'}
  )
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

  return client.fetch(
    `
    *[_type == $type][0].detailCta{
      eyebrow, heading,
      backgroundColor, eyebrowColor, headingColor,
      buttonColor, buttonTextColor, phoneColor
    }
  `,
    {type},
    {cache: 'no-store'}
  )
}
