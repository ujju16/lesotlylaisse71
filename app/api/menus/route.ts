import { NextRequest, NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

export async function GET() {
  try {
    const query = gql`
      query GetMenus {
        menus(orderBy: name_ASC) {
          id
          name
          slug
          description
          active
          startDate
          endDate
          dishes {
            id
            name
            price
            category {
              name
            }
          }
        }
      }
    `;

    const data: any = await adminHygraphClient.request(query);
    return NextResponse.json({ success: true, data: data.menus });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, active, startDate, endDate, dishIds } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: 'Champs requis: name, slug' },
        { status: 400 }
      );
    }

    // Si active, désactiver les autres menus
    if (active) {
      const deactivate = gql`mutation { updateManyMenus(where: { active: true }, data: { active: false }) { count } }`;
      await adminHygraphClient.request(deactivate);
    }

    const mutation = gql`
      mutation CreateMenu(
        $name: String!
        $slug: String!
        $description: String
        $active: Boolean!
        $startDate: Date
        $endDate: Date
        $dishIds: [DishWhereUniqueInput!]
      ) {
        createMenu(
          data: {
            name: $name
            slug: $slug
            description: $description
            active: $active
            startDate: $startDate
            endDate: $endDate
            dishes: { connect: $dishIds }
          }
        ) {
          id
          name
          slug
          active
        }
        publishMenu(where: { slug: $slug }, to: PUBLISHED) {
          id
        }
      }
    `;

    const variables = {
      name,
      slug,
      description,
      active: active || false,
      startDate,
      endDate,
      dishIds: dishIds ? dishIds.map((id: string) => ({ id })) : [],
    };

    const data: any = await adminHygraphClient.request(mutation, variables);
    return NextResponse.json({ success: true, data: data.createMenu, message: 'Menu créé' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
