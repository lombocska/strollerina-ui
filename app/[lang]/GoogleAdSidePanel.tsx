'use client'

import GoogleAd from './GoogleAd'

export default function GoogleAdSidePanel() {

  return (
    <aside className="hidden 2xl:block md:w-[250px] fixed left-0 top-16 h-full max-h-[1000px] bg-transparent overflow-y-auto">
      <div className="sticky top-16">
        <GoogleAd
          adClient="ca-pub-1946644893911245"
          adSlot="9479770359"
          className="block w-full h-[800px] rounded-lg shadow-md bg-gray-100"
        />
      </div>
    </aside>
  )
}
