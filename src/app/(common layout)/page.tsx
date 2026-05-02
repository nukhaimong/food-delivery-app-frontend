import { AppPromo } from '@/components/modules/homepage/appPromo';
import CategorySection from '@/components/modules/homepage/categories';
import FoodHero from '@/components/modules/homepage/hereSection';
import { HowItWorks } from '@/components/modules/homepage/howItWorks';
import { PartnerSection } from '@/components/modules/homepage/partner';
import RecentMealsSection from '@/components/modules/homepage/recentMeal';
import TopRestaurants from '@/components/modules/homepage/topRestaurants';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <FoodHero />
      <CategorySection />
      <RecentMealsSection />
      <TopRestaurants />
      <HowItWorks />
      <PartnerSection />
      <AppPromo />
    </div>
  );
}
