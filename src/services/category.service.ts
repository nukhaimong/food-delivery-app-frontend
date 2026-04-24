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
      const data = await res.json();
      if (!res.ok) {
        return { error: { message: data.message } };
      }

      return data;
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

      const data = await res.json();

      if (!res.ok) {
        return { error: { message: data.message } };
      }

      return data;
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
      return { error: { message: 'Category Creation failed' } };
    }
  },
};
