import FoodMeals from '@/components/modules/Restaurants/foodMeals';
import { mealService } from '@/services/meal.service';

export default async function Foods() {
  const { data } = await mealService.getMeal();
  const meals = data?.meals;

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero / Header Section */}
      <section className="bg-orange-50 dark:bg-slate-900/50 border-b border-orange-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
            Discover <span className="text-orange-500">Delicious</span> Meals
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore the best dishes from top-rated restaurants, delivered
            straight to your door.
          </p>
        </div>
      </section>

      {/* Meals Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Available Meals ({meals?.length})
          </h2>
          {/* You could add a sort/filter dropdown here later */}
        </div>

        <FoodMeals meals={meals} />
      </div>
    </main>
  );
}
