'use client';

import { useEffect } from 'react';

export default function AxeptioConsent() {
  useEffect(() => {
    // Charger le script Axeptio
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://static.axept.io/sdk.js';
    document.head.appendChild(script);

    // Configuration Axeptio
    window._axcb = window._axcb || [];
    window._axcb.push((axeptio: any) => {
      axeptio.on('cookies:complete', (choices: any) => {
        console.log('Axeptio choices:', choices);
      });
    });

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      data-axeptio-project-id="6902a0abfbcad22127eedbf8"
      data-axeptio-cookies-version="lesotlylaisse71-fr"
    />
  );
}

declare global {
  interface Window {
    _axcb: any[];
  }
}
