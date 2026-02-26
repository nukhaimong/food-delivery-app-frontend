'use client';

import { useTransition } from 'react';
import Image from 'next/image';
import { Store, CheckCircle2, PackageX, Trash2, Loader2 } from 'lucide-react';
import { Meal } from '@/types';
import { Button } from '@/components/ui/button';
import { deleteMeal, updateMeal } from '@/actions/meal.action';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface MealsProps {
  meals: Meal[];
}

export default function ProviderMeals({ meals }: MealsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const updateMealHandler = (
    meal_id: string,
    data: { is_available: boolean },
  ) => {
    startTransition(async () => {
      try {
        const res = await updateMeal(meal_id, data);
        if (!res.error) {
          toast.success(
            data.is_available ? 'Meal is now live' : 'Meal marked as Stock Out',
          );
          router.refresh();
        } else {
          toast.error(res.error.message || 'Failed to update');
        }
      } catch (error) {
        toast.error('Something went wrong');
      }
    });
  };

  const deleteMealHandler = (meal_id: string, mealName: string) => {
    if (!confirm(`Are you sure you want to delete ${mealName}?`)) return;

    startTransition(async () => {
      try {
        const res = await deleteMeal(meal_id);
        if (!res.error) {
          toast.success('Meal deleted successfully');
          router.refresh();
        } else {
          toast.error(res.error.message || 'Failed to delete');
        }
      } catch (error) {
        toast.error('Error deleting meal');
      }
    });
  };

  return (
    <section className="px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 justify-center">
          {meals?.map((meal) => (
            <div
              key={meal.id}
              className={cn(
                'w-full group flex flex-col overflow-hidden rounded-3xl  border transition-all duration-300 dark:bg-zinc-900',
                meal.is_available
                  ? 'border-zinc-100 bg-white hover:shadow-xl dark:border-zinc-800'
                  : 'border-zinc-200 bg-zinc-50/50 grayscale-[0.3] dark:border-zinc-800 opacity-90',
              )}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={meal.image_url}
                  alt={meal.meal_name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                {/* Visual Status Overlay */}
                {!meal.is_available && (
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="bg-zinc-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                      Inactive
                    </span>
                  </div>
                )}
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
                  <span className="text-lg font-black text-orange-600 dark:text-orange-500">
                    ${meal.price}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                  <Store className="h-3.5 w-3.5" />
                  <span className="line-clamp-1 text-xs font-medium italic">
                    {meal.provider.providerProfile.restaurant_name}
                  </span>
                </div>

                {/* Provider Action Buttons */}
                <div className="mt-6 flex flex-col gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Button
                      disabled={isPending || meal.is_available}
                      onClick={() =>
                        updateMealHandler(meal.id, { is_available: true })
                      }
                      variant="outline"
                      className={cn(
                        'flex-1 h-9 gap-1.5 border-emerald-100 text-emerald-600 transition-all',
                        meal.is_available
                          ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10'
                          : 'hover:bg-emerald-50',
                      )}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-xs font-semibold">Available</span>
                    </Button>

                    <Button
                      disabled={isPending || !meal.is_available}
                      onClick={() =>
                        updateMealHandler(meal.id, { is_available: false })
                      }
                      variant="outline"
                      className={cn(
                        'flex-1 h-9 gap-1.5 border-amber-100 text-amber-600 transition-all',
                        !meal.is_available
                          ? 'bg-amber-50 border-amber-200 dark:bg-amber-500/10'
                          : 'hover:bg-amber-50',
                      )}
                    >
                      <PackageX className="h-4 w-4" />
                      <span className="text-xs font-semibold">Stock Out</span>
                    </Button>
                  </div>

                  <Button
                    disabled={isPending}
                    onClick={() => deleteMealHandler(meal.id, meal.meal_name)}
                    variant="destructive"
                    className="w-full h-9 gap-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white dark:bg-red-950/20 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white border-none shadow-none"
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    <span className="text-xs font-semibold">
                      Delete Listing
                    </span>
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
