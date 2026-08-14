'use client';

import Script from 'next/script';

export default function NetlifyIdentity() {
  return (
    <Script
      src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        const identity = (window as any).netlifyIdentity;
        if (identity) {
          identity.on('init', (user: any) => {
            if (!user) {
              identity.on('login', () => {
                document.location.href = '/admin/';
              });
            }
          });
        }
      }}
    />
  );
}
