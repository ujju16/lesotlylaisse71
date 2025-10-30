import { NextRequest, NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

export async function GET() {
  try {
    const query = gql`
      query GetCategories {
        categories(orderBy: order_ASC) {
          id
          name
          slug
          description
          order
          icon
          image {
            id
            url
          }
        }
      }
    `;

    const data: any = await adminHygraphClient.request(query);
    return NextResponse.json({ success: true, data: data.categories });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, order, icon, imageId } = body;

    if (!name || !slug || order === undefined) {
      return NextResponse.json(
        { success: false, error: 'Champs requis: name, slug, order' },
        { status: 400 }
      );
    }

    const mutation = gql`
      mutation CreateCategory(
        $name: String!
        $slug: String!
        $description: String
        $order: Int!
        $icon: String
        $imageId: ID
      ) {
        createCategory(
          data: {
            name: $name
            slug: $slug
            description: $description
            order: $order
            icon: $icon
            ${imageId ? 'image: { connect: { id: $imageId } }' : ''}
          }
        ) {
          id
          name
          slug
        }
        publishCategory(where: { slug: $slug }, to: PUBLISHED) {
          id
        }
      }
    `;

    const variables = { name, slug, description, order, icon, imageId };
    const data: any = await adminHygraphClient.request(mutation, variables);
    
    return NextResponse.json({
      success: true,
      data: data.createCategory,
      message: 'Catégorie créée',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
