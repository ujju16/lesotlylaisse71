import { NextRequest, NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

export async function GET() {
  try {
    const query = gql`
      query GetDishes {
        dishes(orderBy: name_ASC) {
          id
          name
          slug
          description
          price
          available
          category {
            id
            name
            slug
          }
          image {
            id
            url
          }
        }
      }
    `;

    const data: any = await adminHygraphClient.request(query);
    return NextResponse.json({ success: true, data: data.dishes });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, price, categoryId, available, imageId } = body;

    if (!name || !slug || !price || !categoryId) {
      return NextResponse.json(
        { success: false, error: 'Champs requis: name, slug, price, categoryId' },
        { status: 400 }
      );
    }

    const mutation = gql`
      mutation CreateDish(
        $name: String!
        $slug: String!
        $description: String!
        $price: Float!
        $categoryId: ID!
        $available: Boolean
        $imageId: ID
      ) {
        createDish(
          data: {
            name: $name
            slug: $slug
            description: $description
            price: $price
            category: { connect: { id: $categoryId } }
            available: $available
            ${imageId ? 'image: { connect: { id: $imageId } }' : ''}
          }
        ) {
          id
          name
          slug
          price
        }
        publishDish(where: { slug: $slug }, to: PUBLISHED) {
          id
        }
      }
    `;

    const variables = {
      name,
      slug,
      description: description || '',
      price: parseFloat(price),
      categoryId,
      available: available !== undefined ? available : true,
      imageId,
    };

    const data: any = await adminHygraphClient.request(mutation, variables);
    return NextResponse.json({ success: true, data: data.createDish, message: 'Plat créé' });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
