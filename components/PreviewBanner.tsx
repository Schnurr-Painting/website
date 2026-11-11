'use client'

import {useEffect, useState} from 'react'

// Shown only in preview mode, and only when the site is opened on its own
// (not inside the Studio's Presentation view), so an editor who lands here
// knows they are seeing drafts and can switch back.
export default function PreviewBanner() {
  const [standalone, setStandalone] = useState(false)
  useEffect(() => {
    setStandalone(window.self === window.top)
  }, [])
  if (!standalone) return null
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: '#25112a',
        color: '#fff',
        padding: '10px 16px',
        borderRadius: 8,
        fontSize: 14,
        boxShadow: '0 4px 16px rgba(0,0,0,.25)',
      }}
    >
      Preview mode: showing unpublished drafts.{' '}
      <a href="/api/draft-mode/disable" style={{color: '#c7b434', fontWeight: 600}}>
        Exit preview
      </a>
    </div>
  )
}
