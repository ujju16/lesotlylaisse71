import { NextRequest, NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, description, startDate, endDate, dishIds } = body;

    const mutation = gql`
      mutation UpdateMenu(
        $id: ID!
        $name: String
        $description: String
        $startDate: Date
        $endDate: Date
        $dishIds: [DishWhereUniqueInput!]
      ) {
        updateMenu(
          where: { id: $id }
          data: {
            name: $name
            description: $description
            startDate: $startDate
            endDate: $endDate
            ${dishIds ? 'dishes: { set: $dishIds }' : ''}
          }
        ) {
          id
          name
          slug
        }
        publishMenu(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    `;

    const variables = {
      id,
      name,
      description,
      startDate,
      endDate,
      dishIds: dishIds ? dishIds.map((dishId: string) => ({ id: dishId })) : undefined,
    };

    const data: any = await adminHygraphClient.request(mutation, variables);
    return NextResponse.json({ success: true, data: data.updateMenu, message: 'Menu modifié' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const mutation = gql`mutation DeleteMenu($id: ID!) { deleteMenu(where: { id: $id }) { id } }`;
    await adminHygraphClient.request(mutation, { id: params.id });
    return NextResponse.json({ success: true, message: 'Menu supprimé' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
