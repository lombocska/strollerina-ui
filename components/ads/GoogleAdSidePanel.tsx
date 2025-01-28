'use client'

import { useEffect, useState } from 'react'
import GoogleAd from './GoogleAd'

export default function GoogleAdSidePanel() {
  const [is2xl, setIs2xl] = useState<boolean>(false)

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Update state based on window width
      setIs2xl(window.innerWidth >= 1536)  // 2xl breakpoint is 1536px
    }

    // Initial check when component mounts
    handleResize()

    // Add event listener for resize
    window.addEventListener('resize', handleResize)

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!is2xl) return null
  return (


    <aside className="hidden 2xl:block md:w-[250px] fixed left-0 top-16 h-full max-h-[1000px] bg-transparent overflow-y-auto">
      <div className="sticky top-16">
        <GoogleAd
          adClient="ca-pub-1946644893911245"
          adSlot="6066745749"
          adFormat="auto"
          fullWidthResponsive={true}
          className="block w-full h-[800px] rounded-lg"
        />
      </div>
    </aside>
  )
}
