import { getSession } from '@/actions/user.action';
import ProviderMeals from '@/components/modules/provider/providerMeals';
import NoMealsState from '@/components/modules/Restaurants/noMealState';
import { mealService } from '@/services/meal.service';

export default async function MyRestaurantMeals() {
  const { data: session } = await getSession();
  const { data } = await mealService.getMealByProviderId(session?.user?.id);
  const meals = data?.meals;

  if (!meals || meals.length === 0) {
    return <NoMealsState />;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-10 text-center md:text-left border-b border-gray-100 dark:border-gray-800 pb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Manage My Meals
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            View and manage the dishes currently listed in your restaurant's
            inventory.
          </p>
        </header>

        <ProviderMeals meals={meals} />
      </div>
    </main>
  );
}
