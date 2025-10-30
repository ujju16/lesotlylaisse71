import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_URL || '';

export const hygraphClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.HYGRAPH_TOKEN || ''}`,
  },
});

export const publicHygraphClient = new GraphQLClient(endpoint);

export const adminHygraphClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.HYGRAPH_TOKEN || ''}`,
  },
});
