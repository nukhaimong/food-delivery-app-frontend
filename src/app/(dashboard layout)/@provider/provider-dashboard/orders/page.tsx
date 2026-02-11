'use client';

import { useEffect, useState } from 'react';
import {
  Package,
  MapPin,
  Phone,
  CheckCircle,
  Clock,
  Banknote,
  ClipboardList,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { OrderStatus } from '@/types';

interface Order {
  order_id: string;
  meal_id: string;
  price: number;
  quantity: number;
  delivery_address: string;
  phone_number: string;
  total_price: number;
  order_status: OrderStatus; // Use the enum here
  order_method: string;
  createdAt: string;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`${APP_URL}/order/provider`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (res.ok) {
        const result = await res.json();
        setOrders(result.orders);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const updateOrderStatus = async (
    order_id: string,
    newStatus: OrderStatus,
  ) => {
    setLoadingId(order_id);
    try {
      const res = await fetch(`${APP_URL}/order/update/${order_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_status: newStatus }),
        credentials: 'include',
      });

      if (res.ok) {
        toast.success(`Order updated to ${newStatus}`);
        // Refresh data to show latest status
        await fetchData();
      } else {
        toast.error('Failed to update order');
      }
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Something went wrong');
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 lg:p-12 bg-zinc-50 dark:bg-zinc-950 min-h-screen mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
              MY<span className="text-orange-500 text-6xl">.</span>KITCHEN
            </h1>
            <p className="text-xl text-zinc-500 font-medium mt-2">
              Manage your live orders
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
              Live Feed
            </span>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border-2 border-zinc-100 dark:border-zinc-800 p-8 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* 1. Details Section */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-500 text-white p-3 rounded-2xl">
                      <Package size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black dark:text-white uppercase">
                        #{order.order_id.slice(0, 8)}
                      </h2>
                      <div className="flex items-center gap-2 text-zinc-500 text-sm font-bold">
                        <Clock size={14} />
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm font-bold text-zinc-500 uppercase tracking-tight">
                    <span className="flex items-center gap-1">
                      <ClipboardList size={16} /> {order.quantity} Items
                    </span>
                    <span className="flex items-center gap-1 text-orange-600 font-black">
                      <Banknote size={16} /> ${order.total_price}
                    </span>
                  </div>
                </div>

                {/* 2. Customer Info */}
                <div className="lg:col-span-4 bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-3xl">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                    Delivery Address
                  </p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200 line-clamp-1 mb-3">
                    {order.delivery_address}
                  </p>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                    Customer Phone
                  </p>
                  <p className="text-lg font-black text-orange-600">
                    {order.phone_number}
                  </p>
                </div>

                {/* 3. Status & Action Section */}
                <div className="lg:col-span-4 flex items-center justify-between pl-4 border-l border-zinc-100 dark:border-zinc-800">
                  <div className="text-left">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                      Current Status
                    </p>
                    <span className="text-lg font-black uppercase text-orange-500 animate-pulse">
                      {order.order_status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 min-w-[160px]">
                    {order.order_status === OrderStatus.pending && (
                      <Button
                        onClick={() =>
                          updateOrderStatus(
                            order.order_id,
                            OrderStatus.preparing,
                          )
                        }
                        disabled={loadingId === order.order_id}
                        className="bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-black rounded-xl h-12 hover:scale-105 transition-transform"
                      >
                        {loadingId === order.order_id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          'PREPARING'
                        )}
                      </Button>
                    )}

                    {(order.order_status === OrderStatus.pending ||
                      order.order_status === OrderStatus.preparing) && (
                      <Button
                        onClick={() =>
                          updateOrderStatus(
                            order.order_id,
                            OrderStatus.delivered,
                          )
                        }
                        disabled={loadingId === order.order_id}
                        className="bg-green-600 hover:bg-green-700 text-white font-black rounded-xl h-12 hover:scale-105 transition-transform"
                      >
                        {loadingId === order.order_id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          'DELIVERED'
                        )}
                      </Button>
                    )}

                    {order.order_status === OrderStatus.delivered && (
                      <div className="flex items-center gap-2 text-green-600 font-black justify-center py-2 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <CheckCircle size={18} /> COMPLETE
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
