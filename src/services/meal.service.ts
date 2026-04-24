import { PostMealData } from '@/types';
import { cookies } from 'next/headers';

const APP_URL = process.env.APP_URL;

export const mealService = {
  getMeal: async () => {
    try {
      const res = await fetch(`${APP_URL}/meals`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });
      const meals = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: 'Meal Fetch failed' } };
      }

      return { data: meals, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Internal Server Error' } };
    }
  },
  getMealById: async (meal_id: string) => {
    try {
      const res = await fetch(`${APP_URL}/meals${meal_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });
      if (!res.ok) {
        return { error: { message: 'Meal Fetch failed' } };
      }
      const meals = await res.json();
      return { data: meals };
    } catch (error) {
      return { error: { message: 'Internal Server Error' } };
    }
  },
  getMealByProviderId: async (provider_id: string) => {
    try {
      const res = await fetch(`${APP_URL}/meals/provider/${provider_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });
      if (!res.ok) {
        return { error: { message: 'Meal Fetch failed' } };
      }
      const meals = await res.json();
      return { data: meals };
    } catch (error) {
      return { error: { message: 'Internal Server Error' } };
    }
  },
  getMealByCategoryId: async (category_id: string) => {
    try {
      const res = await fetch(`${APP_URL}/meals/category/${category_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });
      if (!res.ok) {
        return { error: { message: 'Meal Fetch failed' } };
      }
      const meals = await res.json();
      return { data: meals };
    } catch (error) {
      return { error: { message: 'Internal Server Error' } };
    }
  },
  updateMeal: async (meal_id: string, mealData: { is_available: boolean }) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const res = await fetch(`${APP_URL}/meals/${meal_id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mealData),
        cache: 'no-cache',
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      return { error: { message: 'Internal Server Error' } };
    }
  },
  deleteMeals: async (meal_id: string) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const res = await fetch(`${APP_URL}/meals/${meal_id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      return { error: { message: 'Internal Server Error' } };
    }
  },
  createMeal: async (mealData: PostMealData) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const res = await fetch(`${APP_URL}/meals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mealData),
        cache: 'no-cache',
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: data.message } };
      }

      return data;
    } catch (error) {
      return { data: null, error: { message: 'Internal Server Error' } };
    }
  },
};
