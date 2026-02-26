'use server';

import { mealService } from '@/services/meal.service';
import { PostMealData } from '@/types';

export const getMeals = async () => {
  return mealService.getMeal();
};

export const createMeal = async (data: PostMealData) => {
  return await mealService.createMeal(data);
};

export const updateMeal = async (
  meal_id: string,
  data: { is_available: boolean },
) => {
  return await mealService.updateMeal(meal_id, data);
};

export const deleteMeal = async (meal_id: string) => {
  return await mealService.deleteMeals(meal_id);
};
