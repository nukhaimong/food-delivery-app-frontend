import CategorySection from '@/components/modules/homepage/categories';
import FoodHero from '@/components/modules/homepage/hereSection';
import RecentMealsSection from '@/components/modules/homepage/recentMeal';
import TopRestaurants from '@/components/modules/homepage/topRestaurants';
import { categoryService } from '@/services/category.service';
import { mealService } from '@/services/meal.service';
import { providerService } from '@/services/provider.service';
export default async function Home() {
  const { data } = await categoryService.getCategory();
  const { data: mealData } = await mealService.getMeal();
  const { data: providers } = await providerService.getProvidersProfiles();

  const providersData = providers.allProvidersProfiles;
  const categories = data.category;
  const meals = mealData.meals;

  return (
    <div className="max-w-7xl mx-auto">
      <FoodHero />
      <CategorySection categories={categories} />
      <RecentMealsSection meals={meals} />
      <TopRestaurants restaurants={providersData} />
    </div>
  );
}
