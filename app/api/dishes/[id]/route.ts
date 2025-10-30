import { NextRequest, NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, description, price, categoryId, available, imageId } = body;

    const mutation = gql`
      mutation UpdateDish(
        $id: ID!
        $name: String
        $description: String
        $price: Float
        $categoryId: ID
        $available: Boolean
        $imageId: ID
      ) {
        updateDish(
          where: { id: $id }
          data: {
            name: $name
            description: $description
            price: $price
            ${categoryId ? 'category: { connect: { id: $categoryId } }' : ''}
            available: $available
            ${imageId ? 'image: { connect: { id: $imageId } }' : ''}
          }
        ) {
          id
          name
          slug
        }
        publishDish(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    `;

    const variables = {
      id,
      name,
      description,
      price: price ? parseFloat(price) : undefined,
      categoryId,
      available,
      imageId,
    };

    const data: any = await adminHygraphClient.request(mutation, variables);
    return NextResponse.json({ success: true, data: data.updateDish, message: 'Plat modifié' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const mutation = gql`mutation DeleteDish($id: ID!) { deleteDish(where: { id: $id }) { id } }`;
    await adminHygraphClient.request(mutation, { id: params.id });
    return NextResponse.json({ success: true, message: 'Plat supprimé' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
