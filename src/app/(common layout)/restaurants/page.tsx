import AllRestuarants from '@/components/modules/provider/allRestaurants';
import { providerService } from '@/services/provider.service';

export default async function AllRestaurants() {
  const { data: providers } = await providerService.getProvidersProfiles();
  const providersData = providers.allProvidersProfiles;
  return (
    <div>
      <AllRestuarants restaurants={providersData} />
    </div>
  );
}
