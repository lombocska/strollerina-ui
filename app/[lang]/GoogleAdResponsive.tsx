'use client';

import { useEffect, useState } from 'react';

interface ResponsiveGoogleAdProps {
  adClient: string;
  adSlot: string;
  className?: string;
}

export default function ResponsiveGoogleAd() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is less than 768px (mobile breakpoint)
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);
  
  return (
    <div className={`rounded-lg shadow-md ${isMobile ? 'w-full' : 'w-auto'} bg-gray-100`}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: isMobile ? '100%' : 'auto',
          textAlign: 'center',
        }}
        data-ad-client={'ca-pub-1946644893911245'}
        data-ad-slot={'9479770359'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
