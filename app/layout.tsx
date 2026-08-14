import type { Metadata } from 'next';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600&family=Lora:ital,wght@0,500;0,600;0,700;1,600&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --navy: #3a1843;
            --navy-deep: #2a102f;
            --cream: #f5f1e8;
            --paper: #fffdf8;
            --orange: #c7b434;
            --gold: #c7b434;
            --violet: #761b82;
            --teal: #6f6677;
            --green: #7d856f;
            --blue: #5a7080;
            --ink: #112a35;
            --body: #40515a;
            --line: #d9d5cb;
            --display: 'Lora', Georgia, serif;
            --body-font: 'Inter', Arial, sans-serif;
            --utility: 'Barlow Condensed', 'Arial Narrow', sans-serif;
            --content-max: 1680px;
          }
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { margin: 0; color: var(--ink); background: var(--paper); font-family: var(--body-font); }
          a { color: inherit; text-decoration: none; }
          img { max-width: 100%; }
          .container { width: min(calc(100% - 120px), var(--content-max)); margin-inline: auto; }
          .eyebrow { font-family: var(--utility); font-size: 13px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
          .btn { min-height: 50px; padding: 0 24px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; font-family: var(--utility); font-size: 15px; font-weight: 700; text-transform: uppercase; border: none; cursor: pointer; text-decoration: none; }
          .btn-primary { background: var(--orange); color: white; }
          .btn-outline-light { border: 2px solid white; color: white; background: transparent; }
          @media (max-width: 900px) { .container { width: min(calc(100% - 48px), var(--content-max)); } }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
