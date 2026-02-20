import { orderService } from '@/services/order.service';
import {
  CreditCard,
  UtensilsCrossed,
  CalendarDays,
  History,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function UserDashboard() {
  const { data } = await orderService.getOrderByCustomerId();
  const orders = data?.orders;

  // Aggregate total spending
  const totalSpent = orders?.reduce(
    (sum: number, order: { total_price: number }): number => {
      return sum + order.total_price;
    },
    0,
  );

  const stats = [
    {
      title: 'Total Spent',
      value: `$${totalSpent?.toLocaleString()}`,
      icon: CreditCard,
      color: 'text-orange-600',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      title: 'Meals Ordered',
      value: orders?.length.toString(),
      icon: UtensilsCrossed,
      color: 'text-zinc-900 dark:text-white',
      bg: 'bg-zinc-100 dark:bg-zinc-800',
    },
  ];

  return (
    <div className="p-6 lg:p-12 bg-zinc-50 dark:bg-zinc-950 min-h-screen mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
              MY<span className="text-orange-500">.</span>ACTIVITY
            </h1>
            <p className="text-zinc-500 font-medium">
              Your personal food spending and history
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest bg-white dark:bg-zinc-900 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CalendarDays size={14} className="text-orange-500" />
            Last Updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {stats?.map((stat) => (
            <Card
              key={stat.title}
              className="border-none shadow-xl bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-zinc-400">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bg} ${stat.color} p-2 rounded-xl`}>
                  <stat.icon size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold border-zinc-200 dark:border-zinc-700"
                  >
                    LIFETIME
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-500 rounded-lg text-white">
              <History size={20} />
            </div>
            <h2 className="text-xl font-black uppercase italic tracking-tight text-zinc-900 dark:text-white">
              Latest Activity
            </h2>
          </div>

          {orders?.length > 0 ? (
            <div className="space-y-4">
              <p className="text-zinc-500 text-sm font-medium">
                Your last order was a{' '}
                <span className="text-orange-600 font-bold">
                  {orders[0].meal?.meal_name || 'delicious meal'}
                </span>{' '}
                for{' '}
                <span className="font-bold text-zinc-900 dark:text-white">
                  ${orders[0].total_price}
                </span>
                .
              </p>
            </div>
          ) : (
            <p className="text-zinc-400 text-sm italic font-medium">
              No orders found. Time to grab some Biriani?
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
