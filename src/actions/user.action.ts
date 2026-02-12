'use server';

import { userService } from '@/services/user.service';

export const updateUser = async (imageUrl: string, name: string) => {
  return await userService.updateUser(imageUrl, name);
};
