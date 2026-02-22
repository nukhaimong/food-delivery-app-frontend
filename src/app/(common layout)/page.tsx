import CategorySection from '@/components/modules/homepage/categories';
import FoodHero from '@/components/modules/homepage/hereSection';
import RecentMealsSection from '@/components/modules/homepage/recentMeal';
import TopRestaurants from '@/components/modules/homepage/topRestaurants';
import { categoryService } from '@/services/category.service';
import { mealService } from '@/services/meal.service';
import { providerService } from '@/services/provider.service';
import { cookies } from 'next/headers';

export default async function Home() {
  // Get cookies from the browser's request
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const { data } = await categoryService.getCategory();
  const { data: mealData } = await mealService.getMeal();
  const { data: providers } = await providerService.getProvidersProfiles();

  const providersData = providers?.allProvidersProfiles;
  const categories = data?.category;
  const meals = mealData?.meals;

  const sessionRes = await fetch(
    'https://food-delivery-app-backend-58qb.onrender.com/api/auth/get-session',
    {
      headers: {
        Cookie: cookieHeader, // Manually forward cookies
      },
      cache: 'no-store',
    },
  );
  const session = await sessionRes.json();
  console.log('Session:', session);

  return (
    <div className="max-w-7xl mx-auto">
      <FoodHero />
      <CategorySection categories={categories} />
      <RecentMealsSection meals={meals} />
      <TopRestaurants restaurants={providersData} />
    </div>
  );
}
