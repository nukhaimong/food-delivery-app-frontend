import { cookies } from 'next/headers';

const APP_URL = process.env.APP_URL;

export const providerService = {
  getProvidersProfiles: async () => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${APP_URL}/provider-profile`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: 'no-cache',
      });
      const providers = await res.json();
      if (!res) {
        return { data: null, error: { message: 'Something Went Wrong' } };
      }
      return { data: providers, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
  getProviderById: async (providerId: string) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${APP_URL}/provider-profile/${providerId}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: 'no-cache',
      });
      const providersProfile = await res.json();
      if (!res) {
        return { data: null, error: { message: 'Something Went Wrong' } };
      }
      return { data: providersProfile, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  createProviderProfile: async (
    restaurantImageUrl?: string,
    address?: string,
    restarantName?: string,
    phone?: string,
  ) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${APP_URL}/provider-profile/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({
          ...(restaurantImageUrl && { restaurant_image: restaurantImageUrl }),
          ...(restarantName && { restaurant_name: restarantName }),
          ...(address && { address }),
          ...(phone && { phone_number: phone }),
        }),
      });

      if (!res.ok) {
        console.error('Backend error:', res.status);
        return { data: null, error: { message: 'Profile Creation failed' } };
      }
      const providerProfile = await res.json();
      return { data: providerProfile, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something went wrong' } };
    }
  },
};
