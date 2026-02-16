import FoodMeals from '@/components/modules/Restaurants/foodMeals';
import EmptyMealForCuisine from '@/components/ui/noMealForCuisine';
import { mealService } from '@/services/meal.service';

export default async function AllFoodOfTheCuisine({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await mealService.getMealByCategoryId(id);
  const meals = data?.meals;

  if (!meals) {
    return <EmptyMealForCuisine />;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-10 text-center md:text-left border-b border-gray-100 dark:border-gray-800 pb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Our Menu
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            Freshly prepared meals from our kitchen to your table.
          </p>
        </header>

        <FoodMeals meals={meals} />
      </div>
    </main>
  );
}
