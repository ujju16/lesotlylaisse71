#!/bin/bash

# Fix dishes/[id]/route.ts
cat > app/api/dishes/[id]/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, description, price, categoryId, available, imageId } = body;

    const mutation = gql`
      mutation UpdateDish($id: ID!, $name: String, $description: String, $price: Float, $categoryId: ID, $available: Boolean, $imageId: ID) {
        updateDish(where: { id: $id }, data: { name: $name, description: $description, price: $price, ${categoryId ? 'category: { connect: { id: $categoryId } }' : ''}, available: $available, ${imageId ? 'image: { connect: { id: $imageId } }' : ''} }) { id name slug }
        publishDish(where: { id: $id }, to: PUBLISHED) { id }
      }
    `;

    const data: any = await adminHygraphClient.request(mutation, { id, name, description, price: price ? parseFloat(price) : undefined, categoryId, available, imageId });
    return NextResponse.json({ success: true, data: data.updateDish, message: 'Plat modifié' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const mutation = gql`mutation DeleteDish($id: ID!) { deleteDish(where: { id: $id }) { id } }`;
    await adminHygraphClient.request(mutation, { id });
    return NextResponse.json({ success: true, message: 'Plat supprimé' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
EOF

# Fix menus/[id]/route.ts
cat > app/api/menus/[id]/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, description, startDate, endDate, dishIds } = body;

    const mutation = gql`
      mutation UpdateMenu($id: ID!, $name: String, $description: String, $startDate: Date, $endDate: Date, $dishIds: [DishWhereUniqueInput!]) {
        updateMenu(where: { id: $id }, data: { name: $name, description: $description, startDate: $startDate, endDate: $endDate, ${dishIds ? 'dishes: { set: $dishIds }' : ''} }) { id name slug }
        publishMenu(where: { id: $id }, to: PUBLISHED) { id }
      }
    `;

    const data: any = await adminHygraphClient.request(mutation, { id, name, description, startDate, endDate, dishIds: dishIds ? dishIds.map((dishId: string) => ({ id: dishId })) : undefined });
    return NextResponse.json({ success: true, data: data.updateMenu, message: 'Menu modifié' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const mutation = gql`mutation DeleteMenu($id: ID!) { deleteMenu(where: { id: $id }) { id } }`;
    await adminHygraphClient.request(mutation, { id });
    return NextResponse.json({ success: true, message: 'Menu supprimé' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
EOF

# Fix menus/[id]/activate/route.ts
cat > app/api/menus/[id]/activate/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const deactivate = gql`mutation { updateManyMenus(where: { active: true }, data: { active: false }) { count } }`;
    await adminHygraphClient.request(deactivate);
    const activate = gql`mutation ActivateMenu($id: ID!) { updateMenu(where: { id: $id }, data: { active: true }) { id name active } publishMenu(where: { id: $id }, to: PUBLISHED) { id } }`;
    const data: any = await adminHygraphClient.request(activate, { id });
    const publishAll = gql`mutation { publishManyMenus(to: PUBLISHED) { count } }`;
    await adminHygraphClient.request(publishAll);
    return NextResponse.json({ success: true, data: data.updateMenu, message: 'Menu activé' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
EOF

echo "✅ All [id] routes fixed"
