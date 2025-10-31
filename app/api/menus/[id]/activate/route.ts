import { NextRequest, NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const deactivate = gql`
      mutation {
        updateManyMenus(where: { active: true }, data: { active: false }) {
          count
        }
      }
    `;
    await adminHygraphClient.request(deactivate);
    const activate = gql`
      mutation ActivateMenu($id: ID!) {
        updateMenu(where: { id: $id }, data: { active: true }) {
          id
          name
          active
        }
        publishMenu(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    `;
    const data: any = await adminHygraphClient.request(activate, { id });
    const publishAll = gql`
      mutation {
        publishManyMenus(to: PUBLISHED) {
          count
        }
      }
    `;
    await adminHygraphClient.request(publishAll);
    return NextResponse.json({ success: true, data: data.updateMenu, message: 'Menu activé' });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
