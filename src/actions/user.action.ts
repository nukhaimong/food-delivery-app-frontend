'use server';

import { categoryService } from '@/services/category.service';
import { userService } from '@/services/user.service';

export const updateUser = async (imageUrl: string, name: string) => {
  return await userService.updateUser(imageUrl, name);
};
export const createProviderProfile = async (
  restaurantImageUrl?: string,
  address?: string,
  restarantName?: string,
  phone?: string,
) => {
  return await userService.createProviderProfile(
    restaurantImageUrl,
    address,
    restarantName,
    phone,
  );
};

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
