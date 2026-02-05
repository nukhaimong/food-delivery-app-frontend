import { cookies } from 'next/headers';

const APP_URL = process.env.APP_URL;

export const categoryService = {
  getCategory: async () => {
    try {
      const res = await fetch(`${APP_URL}/category`, {
        next: {
          revalidate: 60,
        },
      });

      if (!res.ok) {
        return { data: null, error: { message: 'Something Went Worng' } };
      }
      const category = await res.json();
      return { data: category, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
  createCategory: async (
    category_name: string,
    description: string,
    category_image: string,
  ) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${APP_URL}/category/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({
          category_name,
          description,
          category_image,
        }),
        cache: 'no-cache',
      });
      if (!res.ok) {
        return { data: null, error: { message: 'Category Creation failed' } };
      }
      const category = await res.json();
      return { data: category, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: 'Category Creation failed' } };
    }
  },
};
