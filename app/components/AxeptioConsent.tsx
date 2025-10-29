'use client';

import Script from 'next/script';

export default function AxeptioConsent() {
  return (
    <>
      <Script
        id="axeptio-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.axeptioSettings = {
              clientId: "6902a0abfbcad22127eedbf8",
              cookiesVersion: "lesotlylaisse71-fr"
            };
          `
        }}
      />
      <Script
        id="axeptio-sdk"
        src="https://static.axept.io/sdk.js"
        strategy="beforeInteractive"
      />
    </>
  );
}

declare global {
  interface Window {
    axeptioSettings: any;
    _axcb: any[];
  }
}
