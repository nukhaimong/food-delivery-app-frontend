'use server';

import { orderService } from '@/services/order.service';
import { orderData } from '@/types';

export const createOrder = async (data: orderData[]) => {
  return await orderService.createOrder(data);
};

export const getOrderByProviderId = async () => {
  return await orderService.getOrderByProviderId();
};
