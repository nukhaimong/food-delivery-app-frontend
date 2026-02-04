const APP_URL = process.env.APP_URL;

export const categoryService = {
  getCategory: async () => {
    try {
      const res = await fetch(`${APP_URL}/category`, {
        next: {
          revalidate: 60,
        },
      });
      const category = await res.json();
      if (!category) {
        return { data: null, error: { message: 'Something Went Worng' } };
      }
      return { data: category, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
};
