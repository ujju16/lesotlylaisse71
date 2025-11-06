import { gql } from "graphql-request";
import { publicHygraphClient, adminHygraphClient } from "./hygraph";

// ==================== TYPES ====================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  icon?: string;
  image?: {
    id: string;
    url: string;
  };
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  available: boolean;
  image?: {
    url: string;
  };
  slug: string;
}

export interface Menu {
  id: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  startDate?: string;
  endDate?: string;
  dishes: Dish[];
}

export interface QRCodeConfig {
  id: string;
  name: string;
  currentMenu?: Menu;
  url: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  message?: string;
  reservationStatus: string;
}

// ==================== CATEGORIES ====================

export async function getCategories(): Promise<Category[]> {
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

  try {
    const data: { categories: Category[] } =
      await adminHygraphClient.request(query);
    return data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function createCategory(
  category: Omit<Category, "id">
): Promise<boolean> {
  const mutation = gql`
    mutation CreateCategory(
      $name: String!
      $slug: String!
      $description: String
      $order: Int!
      $icon: String
    ) {
      createCategory(
        data: {
          name: $name
          slug: $slug
          description: $description
          order: $order
          icon: $icon
        }
      ) {
        id
      }
      publishCategory(where: { slug: $slug }, to: PUBLISHED) {
        id
      }
    }
  `;

  try {
    await adminHygraphClient.request(mutation, category);
    return true;
  } catch (error) {
    console.error("Error creating category:", error);
    return false;
  }
}

export async function updateCategory(
  id: string,
  category: Partial<Category>
): Promise<boolean> {
  const mutation = gql`
    mutation UpdateCategory(
      $id: ID!
      $name: String
      $description: String
      $order: Int
      $icon: String
    ) {
      updateCategory(
        where: { id: $id }
        data: {
          name: $name
          description: $description
          order: $order
          icon: $icon
        }
      ) {
        id
      }
      publishCategory(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }
  `;

  try {
    await adminHygraphClient.request(mutation, { id, ...category });
    return true;
  } catch (error) {
    console.error("Error updating category:", error);
    return false;
  }
}

export async function deleteCategory(id: string): Promise<boolean> {
  const mutation = gql`
    mutation DeleteCategory($id: ID!) {
      deleteCategory(where: { id: $id }) {
        id
      }
    }
  `;

  try {
    await adminHygraphClient.request(mutation, { id });
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    return false;
  }
}

// ==================== DISHES ====================

export async function getDishes(): Promise<Dish[]> {
  const query = gql`
    query GetDishes {
      dishes(orderBy: name_ASC) {
        id
        name
        description
        price
        category {
          id
          name
          slug
        }
        available
        slug
        image {
          url
        }
      }
    }
  `;

  try {
    const data: { dishes: Dish[] } = await publicHygraphClient.request(query);
    return data.dishes;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return [];
  }
}

export async function getDishBySlug(slug: string): Promise<Dish | null> {
  const query = gql`
    query GetDish($slug: String!) {
      dish(where: { slug: $slug }) {
        id
        name
        description
        price
        category {
          id
          name
          slug
        }
        available
        slug
        image {
          url
        }
      }
    }
  `;

  try {
    const data: { dish: Dish } = await publicHygraphClient.request(query, {
      slug,
    });
    return data.dish;
  } catch (error) {
    console.error("Error fetching dish:", error);
    return null;
  }
}

// ==================== MENUS ====================

export async function getMenus(): Promise<Menu[]> {
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
          slug
          price
          category {
            name
          }
        }
      }
    }
  `;

  try {
    const data: { menus: Menu[] } = await publicHygraphClient.request(query);
    return data.menus;
  } catch (error) {
    console.error("Error fetching menus:", error);
    return [];
  }
}

export async function getActiveMenu(): Promise<Menu | null> {
  const query = gql`
    query GetActiveMenu {
      menus(where: { active: true }, first: 1) {
        id
        name
        slug
        description
        active
        dishes {
          id
          name
          description
          price
          available
          slug
          category {
            id
            name
            slug
            order
          }
          image {
            url
          }
        }
      }
    }
  `;

  try {
    const data: { menus: Menu[] } = await publicHygraphClient.request(query);
    return data.menus[0] || null;
  } catch (error) {
    console.error("Error fetching active menu:", error);
    return null;
  }
}

export async function createMenu(menu: Omit<Menu, "id">): Promise<boolean> {
  const mutation = gql`
    mutation CreateMenu(
      $name: String!
      $slug: String!
      $description: String
      $active: Boolean!
    ) {
      createMenu(
        data: {
          name: $name
          slug: $slug
          description: $description
          active: $active
        }
      ) {
        id
      }
      publishMenu(where: { slug: $slug }, to: PUBLISHED) {
        id
      }
    }
  `;

  try {
    await adminHygraphClient.request(mutation, menu);
    return true;
  } catch (error) {
    console.error("Error creating menu:", error);
    return false;
  }
}

export async function updateMenuStatus(
  id: string,
  active: boolean
): Promise<boolean> {
  const mutation = gql`
    mutation UpdateMenuStatus($id: ID!, $active: Boolean!) {
      updateMenu(where: { id: $id }, data: { active: $active }) {
        id
      }
      publishMenu(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }
  `;

  try {
    await adminHygraphClient.request(mutation, { id, active });
    return true;
  } catch (error) {
    console.error("Error updating menu status:", error);
    return false;
  }
}

// ==================== RESERVATIONS ====================

export async function createReservation(
  reservation: Omit<Reservation, "id" | "reservationStatus">
): Promise<boolean> {
  const mutation = gql`
    mutation CreateReservation(
      $name: String!
      $email: String!
      $phone: String!
      $date: Date!
      $time: String!
      $guests: Int!
      $message: String
    ) {
      createReservation(
        data: {
          name: $name
          email: $email
          phone: $phone
          date: $date
          time: $time
          guests: $guests
          message: $message
          reservationStatus: pending
        }
      ) {
        id
      }
    }
  `;

  try {
    await publicHygraphClient.request(mutation, reservation);
    return true;
  } catch (error) {
    console.error("Error creating reservation:", error);
    return false;
  }
}

export async function getReservations(): Promise<Reservation[]> {
  const query = gql`
    query GetReservations {
      reservations(orderBy: date_DESC) {
        id
        name
        email
        phone
        date
        time
        guests
        message
        reservationStatus
      }
    }
  `;

  try {
    const data: { reservations: Reservation[] } =
      await adminHygraphClient.request(query);
    return data.reservations;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
}
