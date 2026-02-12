import AllCategories from '@/components/modules/category/allCategory';
import { categoryService } from '@/services/category.service';

export default async function Cuisines() {
  const { data } = await categoryService.getCategory();
  const categories = data.category;

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[40vh] bg-gradient-to-b from-orange-50 to-transparent dark:from-orange-950/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Explore <span className="text-orange-500">Cuisines</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              What are you in the mood for today?
            </p>
          </div>
        </header>
        <AllCategories categories={categories} />
      </div>
    </main>
  );
}
