import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';

export const initMonitoring = () => {
  if (typeof window === 'undefined') return null;

  const faroUrl = process.env.NEXT_PUBLIC_FARO_URL;

  if (!faroUrl) {
    console.warn('Grafana Faro URL not configured. Monitoring disabled.');
    return null;
  }

  const faro = initializeFaro({
    url: faroUrl,
    app: {
      name: 'lesotlylaisse71',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    },
    instrumentations: [
      ...getWebInstrumentations({
        captureConsole: true,
        captureConsoleDisabledLevels: [],
      }),
    ],
  });

  console.log('✅ Grafana Faro monitoring initialized');
  return faro;
};

export const logError = (error: Error, context?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).faro) {
    (window as any).faro.api.pushError(error, { context });
  }
  console.error('Error:', error, context);
};

export const logEvent = (name: string, attributes?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).faro) {
    (window as any).faro.api.pushEvent(name, attributes);
  }
  console.log('Event:', name, attributes);
};

export const setUser = (userId: string, attributes?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).faro) {
    (window as any).faro.api.setUser({
      id: userId,
      ...attributes,
    });
  }
};
