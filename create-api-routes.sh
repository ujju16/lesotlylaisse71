#!/bin/bash

# Categories [id] route
cat > app/api/categories/[id]/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, description, order, icon, imageId } = body;

    const mutation = gql\`
      mutation UpdateCategory($id: ID!, $name: String, $description: String, $order: Int, $icon: String, $imageId: ID) {
        updateCategory(where: { id: $id }, data: { name: $name, description: $description, order: $order, icon: $icon, image: { connect: { id: $imageId } } }) {
          id name slug
        }
        publishCategory(where: { id: $id }, to: PUBLISHED) { id }
      }
    \`;

    const data: any = await adminHygraphClient.request(mutation, { id, name, description, order, icon, imageId });
    return NextResponse.json({ success: true, data: data.updateCategory, message: 'Catégorie modifiée' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const mutation = gql\`mutation DeleteCategory($id: ID!) { deleteCategory(where: { id: $id }) { id } }\`;
    await adminHygraphClient.request(mutation, { id: params.id });
    return NextResponse.json({ success: true, message: 'Catégorie supprimée' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
EOF

echo "✅ Categories [id] route created"
