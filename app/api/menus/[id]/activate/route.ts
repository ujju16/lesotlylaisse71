import { NextRequest, NextResponse } from 'next/server';
import { adminHygraphClient } from '@/lib/hygraph';
import { gql } from 'graphql-request';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Désactiver tous les menus
    const deactivate = gql`
      mutation DeactivateAll {
        updateManyMenus(where: { active: true }, data: { active: false }) {
          count
        }
      }
    `;
    await adminHygraphClient.request(deactivate);

    // Activer le menu spécifique
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

    // Publier tous les menus pour sync
    const publishAll = gql`mutation { publishManyMenus(to: PUBLISHED) { count } }`;
    await adminHygraphClient.request(publishAll);

    return NextResponse.json({ success: true, data: data.updateMenu, message: 'Menu activé' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
