'use server';

import { orderService } from '@/services/order.service';
import { orderData, OrderStatus } from '@/types';

export const createOrder = async (data: orderData[]) => {
  return await orderService.createOrder(data);
};

export const getOrderByProviderId = async () => {
  return await orderService.getOrderByProviderId();
};

export const getCustomerOrders = async () => {
  return await orderService.getOrderByCustomerId();
};
export const updateOrderStatusByCustomer = async (
  order_id: string,
  order_status: OrderStatus,
) => {
  return await orderService.updateOrderStatusByCustomer(order_id, order_status);
};
