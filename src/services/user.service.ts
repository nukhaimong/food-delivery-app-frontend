import { cookies } from 'next/headers';

const AUTH_URL = process.env.AUTH_URL;
const APP_URL = process.env.APP_URL;

export const userService = {
  getSession: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: 'no-cache',
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: 'Something Went Wrong' } };
      }

      return { data: session, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
  getProvider: async (providerId: string) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${APP_URL}/provider-profile/${providerId}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: 'no-cache',
      });
      const provider = await res.json();
      if (!res) {
        return { data: null, error: { message: 'Something Went Wrong' } };
      }
      return { data: provider, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
  updateUser: async (imageUrl?: string, name?: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${APP_URL}/users/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({
          ...(name && { name }),
          ...(imageUrl && { image: imageUrl }),
        }),
        cache: 'no-store',
      });

      if (!res.ok) {
        console.error('Backend error:', res.status);
        return { data: null, error: { message: 'Update failed' } };
      }

      const updatedUser = await res.json();
      return { data: updatedUser, error: null };
    } catch (error) {
      console.error('Service error:', error);
      return { data: null, error: { message: 'Something went wrong' } };
    }
  },
};
