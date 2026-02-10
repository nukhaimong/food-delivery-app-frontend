import { MealData } from '@/types';
import { cookies } from 'next/headers';

const APP_URL = process.env.APP_URL;

export const mealService = {
  createMeal: async (data: MealData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${APP_URL}/meals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: 'no-cache',
      });
      if (!res.ok) {
        return { data: null, error: { message: 'Meal Creation failed' } };
      }
      const meal = await res.json();
      return { data: meal, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Internal Server Error' } };
    }
  },
};
