import Image from 'next/image';
import { Clock } from 'lucide-react';

export interface Meal {
  id: string;
  name: string;
  image: string; // image URL or local path
  price: number;
  restaurant: string;
}

interface RecentMealsSectionProps {
  meals: Meal[];
}

export default function RecentMealsSection({ meals }: RecentMealsSectionProps) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Most recent meals
          </h2>

          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Freshly added
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="group overflow-hidden rounded-2xl border bg-white transition hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={meal.image}
                  alt={meal.name}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="line-clamp-1 text-sm font-semibold">
                  {meal.name}
                </h3>

                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                  {meal.restaurant}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold">₹{meal.price}</span>

                  <button className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-600">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
