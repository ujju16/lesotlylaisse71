import { gql } from 'graphql-request';
import { publicHygraphClient } from './hygraph';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  image?: {
    url: string;
  };
  slug: string;
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
  status: string;
}

// Récupérer tous les plats
export async function getDishes(): Promise<Dish[]> {
  const query = gql`
    query GetDishes {
      dishes(orderBy: category_ASC) {
        id
        name
        description
        price
        category
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
    console.error('Error fetching dishes:', error);
    return [];
  }
}

// Récupérer un plat par slug
export async function getDishBySlug(slug: string): Promise<Dish | null> {
  const query = gql`
    query GetDish($slug: String!) {
      dish(where: { slug: $slug }) {
        id
        name
        description
        price
        category
        available
        slug
        image {
          url
        }
      }
    }
  `;

  try {
    const data: { dish: Dish } = await publicHygraphClient.request(query, { slug });
    return data.dish;
  } catch (error) {
    console.error('Error fetching dish:', error);
    return null;
  }
}

// Créer une réservation
export async function createReservation(reservation: Omit<Reservation, 'id' | 'status'>): Promise<boolean> {
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
          status: pending
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
    console.error('Error creating reservation:', error);
    return false;
  }
}

// Récupérer toutes les réservations (admin)
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
        status
      }
    }
  `;

  try {
    const data: { reservations: Reservation[] } = await publicHygraphClient.request(query);
    return data.reservations;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
}
