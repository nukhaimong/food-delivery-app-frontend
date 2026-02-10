import { MealData } from '@/types';
import { cookies } from 'next/headers';

const APP_URL = process.env.APP_URL;

export const mealService = {
  getMeal: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${APP_URL}/meals`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        cache: 'no-cache',
      });
      if (!res.ok) {
        return { data: null, error: { message: 'Meal Fetch failed' } };
      }
      const meals = await res.json();
      return { data: meals, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Internal Server Error' } };
    }
  },
  getMealById: async (meal_id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${APP_URL}/${meal_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        cache: 'no-cache',
      });
      if (!res.ok) {
        return { data: null, error: { message: 'Meal Fetch failed' } };
      }
      const meals = await res.json();
      return { data: meals, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Internal Server Error' } };
    }
  },
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
