'use client';

import { useEffect, useState } from 'react';
import {
  History,
  MapPin,
  Utensils,
  XCircle,
  Clock,
  CircleDollarSign,
  PhoneCall,
  Loader2,
} from 'lucide-react';
import {
  getCustomerOrders,
  updateOrderStatusByCustomer,
} from '@/actions/order.action';
import { CustomerOrders, OrderStatus } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function MyOrder() {
  const [orders, setOrders] = useState<CustomerOrders[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const { data } = await getCustomerOrders();
      setOrders(data?.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (order_id: string, status: OrderStatus) => {
    if (
      status === OrderStatus.cancelled &&
      !confirm('Are you sure you want to cancel this order?')
    )
      return;

    setProcessingId(order_id);
    try {
      await updateOrderStatusByCustomer(order_id, status);
      await fetchOrders();
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className=" flex flex-col items-center justify-center min-h-[400px] gap-4 ">
        <Loader2 className="animate-spin text-orange-500" size={40} />
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
          Loading your orders...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 lg:p-12 bg-zinc-50 dark:bg-zinc-950 min-h-screen mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
              MY<span className="text-orange-500 text-6xl">.</span>HISTORY
            </h1>
            <p className="text-xl text-zinc-500 font-medium mt-2">
              Track and manage your past meals
            </p>
          </div>
          <Badge
            variant="secondary"
            className="h-fit px-4 py-2 rounded-full font-black text-sm"
          >
            {orders.length} TOTAL ORDERS
          </Badge>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-zinc-900 rounded-sm border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-50 dark:bg-zinc-800/50">
              <TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                <TableHead className="font-black uppercase text-[10px] tracking-widest">
                  Order Details
                </TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">
                  Restaurant
                </TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">
                  Delivery Address
                </TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">
                  Amount
                </TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">
                  Status
                </TableHead>
                <TableHead className="text-right font-black uppercase text-[10px] tracking-widest">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <TableRow
                  key={order.order_id}
                  className="border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50/50 transition-colors"
                >
                  {/* Meal Info */}
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="font-black text-zinc-900 dark:text-white uppercase flex items-center gap-2">
                        <Utensils size={14} className="text-orange-500" />
                        {order.meal.meal_name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500 font-bold">
                        <Clock size={12} />
                        {new Date(order.createdAt).toLocaleDateString(
                          undefined,
                          { dateStyle: 'medium' },
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Restaurant Info */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 italic">
                        {order.providerProfile.restaurant_name}
                      </span>
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <PhoneCall size={12} />{' '}
                        {order.providerProfile.phone_number}
                      </span>
                    </div>
                  </TableCell>

                  {/* Address */}
                  <TableCell className="max-w-[200px]">
                    <div className="flex items-start gap-1">
                      <MapPin
                        size={14}
                        className="text-zinc-400 mt-0.5 shrink-0"
                      />
                      <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium line-clamp-2">
                        {order.delivery_address}
                      </span>
                    </div>
                  </TableCell>

                  {/* Total Price */}
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1 font-black text-zinc-900 dark:text-white">
                      <CircleDollarSign size={16} className="text-green-600" />$
                      {order.total_price.toFixed(2)}
                    </div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase">
                      Qty: {order.quantity}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    <Badge
                      className={`font-black text-[10px] px-3 py-1 rounded-full border-2 uppercase shadow-none bg-transparent ${
                        order.order_status === 'CANCELLED'
                          ? 'border-red-200 text-red-500 hover:bg-red-50'
                          : 'border-blue-200 text-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      {order.order_status}
                    </Badge>
                  </TableCell>

                  {/* Cancel Action */}
                  <TableCell className="text-right">
                    {order.order_status !== OrderStatus.cancelled &&
                    order.order_status !== OrderStatus.delivered ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleUpdateStatus(
                            order.order_id,
                            OrderStatus.cancelled,
                          )
                        }
                        disabled={processingId === order.order_id}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 font-black text-xs gap-2"
                      >
                        {processingId === order.order_id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <>
                            <XCircle size={14} />
                            CANCEL
                          </>
                        )}
                      </Button>
                    ) : (
                      <span className="text-[10px] font-black text-zinc-300 uppercase italic px-4">
                        Locked
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {orders.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center gap-4">
              <History size={48} className="text-zinc-200" />
              <p className="text-zinc-500 font-bold uppercase tracking-widest">
                You haven't ordered anything yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
