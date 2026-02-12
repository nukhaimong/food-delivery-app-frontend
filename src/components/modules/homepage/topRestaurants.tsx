import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';

export interface Restaurant {
  id: string;
  restaurant_name: string;
  restaurant_image: string;
  phone_number: string;
  address: string;
}

interface TopRestaurantsSectionProps {
  restaurants: Restaurant[];
}

export default function TopRestaurants({
  restaurants,
}: TopRestaurantsSectionProps) {
  return (
    <section className="px-6 py-16 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Top Restaurants Near You
            </h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              The best local flavors, delivered straight to your door.
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {restaurants
            .map((restaurant) => (
              <Link
                href={`/restaurants/${restaurant.id}`}
                key={restaurant.id}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-zinc-100 bg-zinc-50/50 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 dark:hover:shadow-none"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={restaurant.restaurant_image}
                    alt={restaurant.restaurant_name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                  {/* Visual Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                    <span className="text-white text-xs font-medium flex items-center gap-1">
                      View Menu <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col p-6">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-600 transition-colors">
                    {restaurant.restaurant_name}
                  </h3>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2 text-zinc-500 dark:text-zinc-400">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-orange-500" />
                      <span className="text-xs leading-relaxed line-clamp-2 italic">
                        {restaurant.address}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                      <Phone className="h-3.5 w-3.5 flex-shrink-0 text-orange-500" />
                      <span className="text-xs font-medium">
                        {restaurant.phone_number}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
            .splice(0, 5)}
        </div>
      </div>
    </section>
  );
}
