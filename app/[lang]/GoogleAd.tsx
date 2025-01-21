'use client'

import { useEffect } from 'react'

interface GoogleAdProps {
  adClient: string
  adSlot: string
  adFormat?: string
  adLayout?: string
  className?: string
}

export default function GoogleAd({
  adClient,
  adSlot,
  adFormat = 'fluid',
  adLayout = 'in-article',
  className = '',
}: GoogleAdProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }, [])

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
      ></ins>
    </div>
  )
}
