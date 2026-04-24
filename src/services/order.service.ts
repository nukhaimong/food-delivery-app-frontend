import { orderData, OrderStatus } from '@/types';

import { cookies } from 'next/headers';

const APP_URL = process.env.APP_URL;

export const orderService = {
  createOrder: async (orderData: orderData[]) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const res = await fetch(`${APP_URL}/order/place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
        cache: 'no-cache',
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      return { error: { message: 'Order Creation Failed' } };
    }
  },
  getOrderByProviderId: async () => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const res = await fetch(`${APP_URL}/order/provider`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });

      if (!res.ok) {
        return { error: { message: 'Failed To Fetch Orders' } };
      }
      const orders = await res.json();
      return { data: orders };
    } catch (error) {
      return { error: { message: 'Failed To Fetch Orders' } };
    }
  },
  getOrderByCustomerId: async () => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const res = await fetch(`${APP_URL}/order/customer/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });

      if (!res.ok) {
        return { error: { message: 'Failed To Fetch Your Order' } };
      }
      const orders = await res.json();
      return { data: orders };
    } catch (error) {
      return { error: { message: 'Failed To Fetch Your Order' } };
    }
  },
  updateOrderStatusByCustomer: async (
    order_id: string,
    order_status: OrderStatus,
  ) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const res = await fetch(`${APP_URL}/order/update/${order_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          //Cookie: cookieStore.toString(),
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order_status }),
        cache: 'no-cache',
      });

      if (!res.ok) {
        return { error: { message: 'Failed To Fetch Your Order' } };
      }
      const orders = await res.json();
      return { data: orders };
    } catch (error) {
      return { error: { message: 'Failed To Fetch Your Order' } };
    }
  },
};
