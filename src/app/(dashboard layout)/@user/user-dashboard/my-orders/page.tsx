'use client';

import {
  getCustomerOrders,
  updateOrderStatusByCustomer,
} from '@/actions/order.action';
import { CustomerOrders, OrderStatus } from '@/types';
import { useEffect, useState } from 'react';

export default function MyOrder() {
  const [orders, setOrders] = useState<CustomerOrders[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await getCustomerOrders();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (order_id: string, status: OrderStatus) => {
    if (
      status === 'CANCELLED' &&
      !confirm('Are you sure you want to cancel this order?')
    )
      return;

    try {
      await updateOrderStatusByCustomer(order_id, status);
      await fetchOrders(); // Refresh the list
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center font-medium">Loading your orders...</div>
    );

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          My Order History
        </h1>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
          {orders.length} Orders
        </span>
      </div>

      <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {orders.map((order) => (
          <div
            key={order.order_id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Header: Meal & Status */}
            <div className="p-6 border-b border-gray-50 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {order.meal.meal_name}
                </h2>
                <p className="text-sm text-gray-500">
                  Placed on{' '}
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    dateStyle: 'long',
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  ${order.total_price.toFixed(2)}
                </p>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${
                    order.order_status === 'CANCELLED'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  {order.order_status}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50">
              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                  Restaurant Details
                </h3>
                <p className="font-semibold text-gray-800">
                  {order.providerProfile.restaurant_name}
                </p>
                <p className="text-sm text-gray-600">
                  {order.providerProfile.phone_number}
                </p>
              </section>

              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                  Delivery To
                </h3>
                <p className="text-sm text-gray-800 font-medium leading-relaxed">
                  {order.delivery_address}
                </p>
                <p className="text-sm text-gray-600">
                  Contact: {order.phone_number}
                </p>
              </section>

              <section className="md:col-span-2 flex flex-wrap gap-x-8 gap-y-2 pt-2 border-t border-gray-200">
                <div className="flex gap-2 text-sm">
                  <span className="text-gray-500">Quantity:</span>
                  <span className="font-semibold text-gray-900">
                    {order.quantity}
                  </span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="text-gray-500">Method:</span>
                  <span className="font-semibold text-gray-900 capitalize">
                    {order.order_method}
                  </span>
                </div>
              </section>
            </div>

            {/* Actions */}
            {order.order_status !== OrderStatus.cancelled &&
              order.order_status !== OrderStatus.delivered && (
                <div className="p-4 bg-white gap-3">
                  <button
                    onClick={() =>
                      handleUpdateStatus(order.order_id, OrderStatus.cancelled)
                    }
                    className="px-4 py-2 text-sm font-semibold text-white font-bold bg-red-500 hover:bg-red-600 rounded-lg transition-colors w-full"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
