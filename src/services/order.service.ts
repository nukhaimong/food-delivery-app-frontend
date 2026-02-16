import { orderData, OrderStatus } from '@/types';

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
  getOrderByProviderId: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${APP_URL}/order/provider`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        cache: 'no-cache',
        next: {
          revalidate: 10,
        },
      });

      if (!res.ok) {
        return { data: null, error: { message: 'Failed To Fetch Orders' } };
      }
      const orders = await res.json();
      return { data: orders, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Failed To Fetch Orders' } };
    }
  },
  getOrderByCustomerId: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${APP_URL}/order/customer/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        cache: 'no-cache',
      });

      if (!res.ok) {
        return { data: null, error: { message: 'Failed To Fetch Your Order' } };
      }
      const orders = await res.json();
      return { data: orders, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Failed To Fetch Your Order' } };
    }
  },
  updateOrderStatusByCustomer: async (
    order_id: string,
    order_status: OrderStatus,
  ) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${APP_URL}/order/update/${order_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ order_status }),
        cache: 'no-cache',
      });

      if (!res.ok) {
        return { data: null, error: { message: 'Failed To Fetch Your Order' } };
      }
      const orders = await res.json();
      return { data: orders, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Failed To Fetch Your Order' } };
    }
  },
};
