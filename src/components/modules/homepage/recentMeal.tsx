'use client';

import Image from 'next/image';
import { Clock, Store } from 'lucide-react';
import { CartMeal, Meal } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface RecentMealsSectionProps {
  meals: Meal[];
}

export default function RecentMealsSection({ meals }: RecentMealsSectionProps) {
  const addItem = useCartStore((state) => state.addToCart);

  const handleAddToCart = (meal: CartMeal) => {
    addItem(meal);
    toast.success(`${meal.meal_name} added to cart`);
  };

  return (
    <section className="px-6 py-16 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Most recent meals
            </h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Discover the latest culinary additions to our menu.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 dark:bg-orange-950/30">
            <Clock className="h-4 w-4" />
            <span>Freshly added</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={meal.image_url}
                  alt={meal.meal_name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
                {/* Category Badge */}
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-900 backdrop-blur-sm dark:bg-zinc-900/90 dark:text-white">
                  {meal.category.category_name}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="line-clamp-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {meal.meal_name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                  <Store className="h-3.5 w-3.5" />
                  <span className="line-clamp-1 text-xs font-medium italic">
                    {meal.provider.providerProfile.restaurant_name}
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {meal.description}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-400">Price</span>
                    <span className="text-xl font-black text-zinc-900 dark:text-white">
                      ${meal.price}
                    </span>
                  </div>

                  <Button
                    onClick={(e) =>
                      handleAddToCart({
                        meal_id: meal.id,
                        meal_name: meal.meal_name,
                        price: meal.price,
                        image_url: meal.image_url,
                        category: {
                          category_name: meal.category.category_name,
                        },
                        provider: {
                          providerProfile: {
                            providerProfileId: meal.provider.providerProfile.id,
                            restaurant_name:
                              meal.provider.providerProfile.restaurant_name,
                          },
                        },
                      })
                    }
                    className="flex h-10 w-32 items-center justify-center rounded-xl bg-orange-500 text-[18px] text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/40 active:scale-95"
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
