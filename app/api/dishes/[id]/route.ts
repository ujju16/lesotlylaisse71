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
    const { name, description, price, categoryId, available, imageId } = body;

    const mutation = gql`
      mutation UpdateDish($id: ID!, $name: String, $description: String, $price: Float, $categoryId: ID, $available: Boolean, $imageId: ID) {
        updateDish(where: { id: $id }, data: { name: $name, description: $description, price: $price, ${categoryId ? "category: { connect: { id: $categoryId } }" : ""}, available: $available, ${imageId ? "image: { connect: { id: $imageId } }" : ""} }) { id name slug }
        publishDish(where: { id: $id }, to: PUBLISHED) { id }
      }
    `;

    const data: any = await adminHygraphClient.request(mutation, {
      id,
      name,
      description,
      price: price ? parseFloat(price) : undefined,
      categoryId,
      available,
      imageId,
    });
    return NextResponse.json({
      success: true,
      data: data.updateDish,
      message: "Plat modifié",
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
      mutation DeleteDish($id: ID!) {
        deleteDish(where: { id: $id }) {
          id
        }
      }
    `;
    await adminHygraphClient.request(mutation, { id });
    return NextResponse.json({ success: true, message: "Plat supprimé" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
