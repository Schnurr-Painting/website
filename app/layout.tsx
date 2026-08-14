import type { Metadata } from 'next';
// import './globals.css';

export const metadata: Metadata = {
  title: 'Schnurr Painting | Commercial Painting & Coatings',
  description: 'Expert interior and exterior painting, coatings, and wallcovering for commercial buildings.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
