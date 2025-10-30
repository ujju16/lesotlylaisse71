import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'LeSotLyLaisse71 - Restaurant Bar Tabac';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
          LeSotLyLaisse71
        </div>
        <div style={{ fontSize: 40 }}>
          Restaurant · Bar · Tabac
        </div>
        <div style={{ fontSize: 30, marginTop: 20, opacity: 0.9 }}>
          Messey Sur Grosne
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
