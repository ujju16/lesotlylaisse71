import { NextRequest, NextResponse } from "next/server";
import { adminHygraphClient } from "@/lib/hygraph";
import { gql } from "graphql-request";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, description, startDate, endDate, dishIds } = body;

    const mutation = gql`
      mutation UpdateMenu($id: ID!, $name: String, $description: String, $startDate: Date, $endDate: Date, $dishIds: [DishWhereUniqueInput!]) {
        updateMenu(where: { id: $id }, data: { name: $name, description: $description, startDate: $startDate, endDate: $endDate, ${dishIds ? "dishes: { set: $dishIds }" : ""} }) { id name slug }
        publishMenu(where: { id: $id }, to: PUBLISHED) { id }
      }
    `;

    const data: any = await adminHygraphClient.request(mutation, {
      id,
      name,
      description,
      startDate,
      endDate,
      dishIds: dishIds
        ? dishIds.map((dishId: string) => ({ id: dishId }))
        : undefined,
    });
    return NextResponse.json({
      success: true,
      data: data.updateMenu,
      message: "Menu modifié",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const mutation = gql`
      mutation DeleteMenu($id: ID!) {
        deleteMenu(where: { id: $id }) {
          id
        }
      }
    `;
    await adminHygraphClient.request(mutation, { id });
    return NextResponse.json({ success: true, message: "Menu supprimé" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
