'use client';

import { useEffect } from 'react';
import { initMonitoring } from '@/lib/monitoring/faro';

export default function MonitoringProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const faro = initMonitoring();
      if (faro) {
        (window as any).faro = faro;
      }
    }
  }, []);

  return <>{children}</>;
}
