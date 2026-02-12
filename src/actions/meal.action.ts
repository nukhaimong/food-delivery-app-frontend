'use server';

import { mealService } from '@/services/meal.service';
import { PostMealData } from '@/types';

export const createMeal = async (data: PostMealData) => {
  return await mealService.createMeal(data);
};
