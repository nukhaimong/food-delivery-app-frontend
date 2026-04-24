import { cookies } from 'next/headers';
import Cookies from 'js-cookie';

const APP_URL = process.env.APP_URL;

export const categoryService = {
  getCategory: async () => {
    try {
      const res = await fetch(`${APP_URL}/category`, {
        // next: {
        //   revalidate: 60,
        // },
      });

      if (!res.ok) {
        return { error: { message: 'Something Went Worng' } };
      }
      const category = await res.json();
      return { data: category };
    } catch (error) {
      return { error: { message: 'Something Went Wrong' } };
    }
  },
  getCategoryById: async (category_id: string) => {
    try {
      const res = await fetch(`${APP_URL}/category/${category_id}`, {
        next: {
          revalidate: 60,
        },
      });

      if (!res.ok) {
        return { error: { message: 'Meal fetch Successfully' } };
      }
      const categories = await res.json();

      return { data: categories };
    } catch (error) {
      return { error: { message: 'Something Went Wrong' } };
    }
  },
  createCategory: async (
    category_name: string,
    description: string,
    category_image: string,
  ) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    try {
      const res = await fetch(`${APP_URL}/category/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category_name,
          description,
          category_image,
        }),
        cache: 'no-cache',
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: { message: data.message } };
      }

      return data;
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: 'Category Creation failed' } };
    }
  },
};
