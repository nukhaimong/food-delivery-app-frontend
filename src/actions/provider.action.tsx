'use server';
import { providerService } from '@/services/provider.service';

export const createProviderProfile = async (
  restaurantImageUrl?: string,
  address?: string,
  restarantName?: string,
  phone?: string,
) => {
  return await providerService.createProviderProfile(
    restaurantImageUrl,
    address,
    restarantName,
    phone,
  );
};
