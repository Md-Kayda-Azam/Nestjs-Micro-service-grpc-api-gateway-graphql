import { BadRequestException } from '@nestjs/common';

// Role ফেচ করার জন্য ইউটিলিটি (Query)
export const fetchRoleById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/graphql`, {
      method: 'POST', // GraphQL সাধারণত POST-ই ব্যবহার করে
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetRole($id: ID!) {
            getRole(id: $id) {
              _id
              name
              description
            }
          }
        `,
        variables: {
          id,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new BadRequestException(
        'Failed to fetch role data from GraphQL service',
      );
    }

    if (data.errors) {
      throw new BadRequestException(
        `GraphQL error: ${JSON.stringify(data.errors)}`,
      );
    }

    return data.data.getRole;
  } catch (error) {
    console.error('Error fetching role:', error);
    throw error;
  }
};

// Permission ফেচ করার জন্য ইউটিলিটি (Query)
export const fetchPermissionById = async (id: string) => {
  try {
    const response = await fetch(`${process.env.GRAPHQL_API_LINK}`, {
      method: 'POST', // GraphQL সাধারণত POST-ই ব্যবহার করে
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetPermission($id: ID!) {
            getPermission(id: $id) {
              _id
              name
              description
              isActive
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          id,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new BadRequestException(
        'Failed to fetch permission data from GraphQL service',
      );
    }

    if (data.errors) {
      throw new BadRequestException(
        `GraphQL error: ${JSON.stringify(data.errors)}`,
      );
    }

    return data.data.getPermission;
  } catch (error) {
    console.error('Error fetching permission:', error);
    throw error;
  }
};

// টাইপস্ক্রিপ্ট টাইপ (ঐচ্ছিক)
export interface Permission {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Role {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  permissions?: Permission[];
  createdAt?: string;
  updatedAt?: string;
}
