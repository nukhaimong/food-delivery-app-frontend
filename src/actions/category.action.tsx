'use server';

import { categoryService } from '@/services/category.service';

export const createCategory = async (
  category_name: string,
  description: string,
  category_image: string,
) => {
  return await categoryService.createCategory(
    category_name,
    description,
    category_image,
  );
};

export const getCategory = async () => {
  return await categoryService.getCategory();
};
