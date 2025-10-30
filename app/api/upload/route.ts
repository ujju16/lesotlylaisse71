import { NextRequest, NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'Aucun fichier' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'Doit être une image' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'Max 5MB' }, { status: 400 });
    }

    // Convertir en base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');

    // Upload vers Hygraph
    const mutation = gql`
      mutation UploadAsset($base64: String!, $fileName: String!) {
        createAsset(data: { upload: { base64: $base64, fileName: $fileName } }) {
          id
          url
          fileName
          mimeType
          size
        }
        publishAsset(where: { fileName: $fileName }, to: PUBLISHED) {
          id
        }
      }
    `;

    const variables = {
      base64: `data:${file.type};base64,${base64}`,
      fileName: file.name,
    };

    const data: any = await adminHygraphClient.request(mutation, variables);

    return NextResponse.json({
      success: true,
      data: data.createAsset,
      message: 'Image uploadée',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
