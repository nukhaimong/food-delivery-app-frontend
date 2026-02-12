import TopRestaurants from '@/components/modules/homepage/topRestaurants';
import { providerService } from '@/services/provider.service';

export default async function AllRestaurants() {
  const { data: providers } = await providerService.getProvidersProfiles();
  const providersData = providers.allProvidersProfiles;
  return (
    <div>
      <TopRestaurants restaurants={providersData} />
    </div>
  );
}
