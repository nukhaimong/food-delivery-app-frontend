import { cookies } from 'next/headers';

const APP_URL = process.env.APP_URL;

export const providerService = {
  getProvidersProfiles: async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    try {
      const res = await fetch(`${APP_URL}/provider-profile`, {
        headers: {
          //Cookie: cookieStore.toString(),
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });
      const providers = await res.json();
      if (!res.ok) {
        return { error: { message: 'Something Went Wrong' } };
      }
      return { data: providers };
    } catch (error) {
      return { error: { message: 'Something Went Wrong' } };
    }
  },
  getProviderById: async (providerId: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    try {
      const res = await fetch(`${APP_URL}/provider-profile/${providerId}`, {
        headers: {
          //Cookie: cookieStore.toString(),
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });
      const providersProfile = await res.json();
      if (!res.ok) {
        return { error: { message: 'Something Went Wrong' } };
      }
      return { data: providersProfile, error: null };
    } catch (error) {
      return { error: { message: 'Something Went Wrong' } };
    }
  },

  createProviderProfile: async (
    restaurantImageUrl?: string,
    address?: string,
    restarantName?: string,
    phone?: string,
  ) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    try {
      const res = await fetch(`${APP_URL}/provider-profile/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //Cookie: cookieStore.toString(),
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...(restaurantImageUrl && { restaurant_image: restaurantImageUrl }),
          ...(restarantName && { restaurant_name: restarantName }),
          ...(address && { address }),
          ...(phone && { phone_number: phone }),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      return { error: { message: 'Something went wrong' } };
    }
  },
};
