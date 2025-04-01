'use client';

import { useEffect, useState } from 'react';

interface MockupBannerProps {
  message?: string;
  backgroundColor?: string;
  textColor?: string;
}

export function MockupBanner({
  message = 'This is a mockup/demo version. You are not interacting with a real network.',
  backgroundColor = '#FFA500',
  textColor = '#000000',
}: MockupBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or when explicitly enabled
    setIsVisible(process.env.NEXT_PUBLIC_SHOW_MOCKUP_BANNER === 'true');
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="w-full py-2 text-center text-sm font-medium"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {message}
    </div>
  );
} 