import { categoryService } from '@/services/category.service';
import AllCategoriesAdmin from './allCategoryAdmin';
import Link from 'next/link';

export default async function CuisinesAdmin() {
  const { data } = await categoryService.getCategory();
  const categories = data?.category || [];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Admin Utility Header */}
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Category Management
            </h2>
            <p className="text-sm text-slate-500">
              Total Cuisines: {categories.length}
            </p>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            <Link href="/admin-dashboard/create-category">
              + Add New Category
            </Link>
          </button>
        </header>
        <div className=" rounded-xl shadow-sm p-6">
          <AllCategoriesAdmin categories={categories} />
        </div>
      </div>
    </main>
  );
}
