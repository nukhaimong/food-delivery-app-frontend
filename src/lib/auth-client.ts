import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  fetchOptions: {
    credentials: 'include',
  },
  headers: {
    'Content-Type': 'application/json',
  },
  onError: (error: any) => {
    console.error('Auth client error:', error);
  },
});
