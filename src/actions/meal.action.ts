'use server';

import { mealService } from '@/services/meal.service';
import { MealData } from '@/types';

export const createMeal = async (data: MealData) => {
  return await mealService.createMeal(data);
};
