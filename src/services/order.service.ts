import { orderData } from '@/types';

import { cookies } from 'next/headers';

const APP_URL = process.env.APP_URL;

export const orderService = {
  createOrder: async (data: orderData[]) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${APP_URL}/order/place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: 'no-cache',
      });
      if (!res.ok) {
        return { data: null, error: { message: 'Order Creation Failed' } };
      }
      const order = await res.json();
      return { data: order, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Order Creation Failed' } };
    }
  },
};
