'use client';

import { useEffect, useState } from 'react';
import {
  Package,
  CheckCircle,
  Clock,
  Banknote,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
  order_status: OrderStatus;
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
    <div className="p-6 lg:p-12 bg-zinc-50 dark:bg-zinc-950 min-h-screen mt-16 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
              MY<span className="text-orange-500 text-6xl">.</span>KITCHEN
            </h1>
            <p className="text-xl text-zinc-500 font-medium mt-2">
              Live Order Management
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-4 py-2 rounded-full shadow-sm border border-zinc-100 dark:border-zinc-800">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Auto-refreshing
            </span>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-sm border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-50 dark:bg-zinc-800/50">
              <TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                <TableHead className="w-[120px] font-black uppercase text-[10px] tracking-widest">
                  Order ID
                </TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">
                  Time & Items
                </TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">
                  Customer & Address
                </TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">
                  Revenue
                </TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">
                  Status
                </TableHead>
                <TableHead className="text-right font-black uppercase text-[10px] tracking-widest">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.order_id}
                  className="border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  {/* ID */}
                  <TableCell className="font-bold font-mono text-orange-600">
                    #{order.order_id.slice(0, 8)}
                  </TableCell>

                  {/* Time & Quantity */}
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold">
                        <Clock size={14} className="text-zinc-400" />
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      <div className="text-xs text-zinc-500 font-medium px-5">
                        {order.quantity}{' '}
                        {order.quantity === 1 ? 'Item' : 'Items'}
                      </div>
                    </div>
                  </TableCell>

                  {/* Customer Info */}
                  <TableCell className="max-w-[250px]">
                    <div className="flex flex-col gap-1">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {order.delivery_address}
                      </div>
                      <div className="text-xs font-black text-orange-500">
                        {order.phone_number}
                      </div>
                    </div>
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    <div className="flex items-center gap-1 font-black text-zinc-900 dark:text-white">
                      <Banknote size={16} className="text-green-600" />$
                      {order.total_price.toFixed(2)}
                    </div>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-black text-[10px] px-3 py-1 rounded-full border-2 uppercase ${
                        order.order_status === OrderStatus.pending
                          ? 'border-amber-500 text-amber-500 animate-pulse'
                          : order.order_status === OrderStatus.preparing
                            ? 'border-blue-500 text-blue-500'
                            : 'border-green-500 text-green-500'
                      }`}
                    >
                      {order.order_status}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {order.order_status === OrderStatus.pending && (
                        <Button
                          size="sm"
                          onClick={() =>
                            updateOrderStatus(
                              order.order_id,
                              OrderStatus.preparing,
                            )
                          }
                          disabled={loadingId === order.order_id}
                          className="bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white font-bold h-9 rounded-lg"
                        >
                          {loadingId === order.order_id ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                          ) : (
                            'PREPARE'
                          )}
                        </Button>
                      )}

                      {(order.order_status === OrderStatus.pending ||
                        order.order_status === OrderStatus.preparing) && (
                        <Button
                          size="sm"
                          onClick={() =>
                            updateOrderStatus(
                              order.order_id,
                              OrderStatus.delivered,
                            )
                          }
                          disabled={loadingId === order.order_id}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold h-9 rounded-lg"
                        >
                          {loadingId === order.order_id ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                          ) : (
                            'DELIVER'
                          )}
                        </Button>
                      )}

                      {order.order_status === OrderStatus.delivered && (
                        <div className="flex items-center gap-1 text-green-600 font-black text-xs pr-2">
                          <CheckCircle size={16} /> DONE
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-48 text-center text-zinc-500 font-medium"
                  >
                    No active orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
