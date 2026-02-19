import { orderService } from '@/services/order.service';
import { Banknote, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ProviderDashboard() {
  const { data } = await orderService.getOrderByProviderId();
  const orders = data?.orders;

  // Aggregate total earnings safely
  const totalEarnings = orders?.reduce(
    (sum: number, order: { total_price: number }): number => {
      return sum + order.total_price;
    },
    0,
  );

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalEarnings?.toLocaleString()}`,
      icon: Banknote,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Total Orders',
      value: orders?.length.toString(),
      icon: ShoppingBag,
      color: 'text-orange-600',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      title: 'Avg. Order Value',
      value:
        orders?.length > 0
          ? `$${(totalEarnings / orders.length).toFixed(2)}`
          : '$0',
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
  ];

  return (
    <div className="p-6 lg:p-12 bg-zinc-50 dark:bg-zinc-950 min-h-screen mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
            DASHBOARD<span className="text-orange-500">.</span>
          </h1>
          <p className="text-zinc-500 font-medium">
            Overview of your restaurant's performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats?.map((stat) => (
            <Card
              key={stat.title}
              className="border-none shadow-xl bg-white dark:bg-zinc-900 rounded-[2rem]"
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
                <p className="text-[10px] text-zinc-400 font-bold mt-1 uppercase tracking-tighter">
                  Real-time data
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placeholder for future sections */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center">
          <p className="text-zinc-400 font-bold uppercase tracking-widest">
            Recent Activity & Charts coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
