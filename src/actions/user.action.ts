'use server';

import { userService } from '@/services/user.service';

export const getSession = async () => {
  return await userService.getSession();
};
export const updateUser = async (
  imageUrl?: string | undefined,
  name?: string,
) => {
  return await userService.updateUser(imageUrl, name);
};
