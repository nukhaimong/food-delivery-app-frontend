import { cookies } from 'next/headers';

const AUTH_URL = process.env.AUTH_URL;

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
};
