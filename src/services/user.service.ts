import { error } from 'console';
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
};
