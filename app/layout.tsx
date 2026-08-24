import type { Metadata } from 'next';
import './globals.css';
import { getSiteFooter } from '@/lib/sanity/queries';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://schnurr-painting-nextjs.netlify.app';

export const metadata: Metadata = {
  title: 'Schnurr Painting | Commercial Painting & Coatings',
  description: 'Expert interior and exterior painting, coatings, and wallcovering for commercial buildings.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footer = await getSiteFooter();
  const contact = footer?.contact || {};

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: 'Schnurr Painting, LLC',
    url: SITE_URL,
    telephone: contact.phone,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.addressLine1,
      addressLocality: contact.addressLine2,
    },
    sameAs: [footer?.social?.facebook].filter(Boolean),
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}