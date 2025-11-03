"use client";

import { useEffect } from "react";

export default function AxeptioConsent() {
  useEffect(() => {
    // Configuration Axeptio
    window.axeptioSettings = {
      clientId: "6902a0abfbcad22127eedbf8",
      cookiesVersion: "lesotlylaisse71-fr",
    };

    // Charger le SDK Axeptio
    const script = document.createElement("script");
    script.src = "https://static.axept.io/sdk.js";
    script.async = true;
    document.head.appendChild(script);

    // Écouter les événements Axeptio
    window._axcb = window._axcb || [];
    window._axcb.push((axeptio: any) => {
      // Événement quand l'utilisateur a fait son choix
      axeptio.on("cookies:complete", (choices: any) => {
        if (choices.google_analytics) {
          console.log("Analytics acceptés");
        }
        if (choices.facebook_pixel) {
          console.log("Facebook Pixel accepté");
        }
      });

      // Événement quand les préférences changent
      axeptio.on("cookies:change", (choices: any) => {
        console.log("Préférences mises à jour:", choices);
      });
    });

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    axeptioSettings: {
      clientId: string;
      cookiesVersion: string;
    };
    _axcb: Array<(axeptio: any) => void>;
  }
}
