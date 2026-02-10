import Image from 'next/image';

export interface Category {
  id: string;
  category_name: string;
  category_image: string;
  description: string;
}

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="px-6 py-16 bg-gray-50/50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Browse by category
            </h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Select a category to explore our curated meals.
            </p>
          </div>
          <button className="hidden sm:block text-sm font-semibold text-orange-600 hover:underline">
            View all categories →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {categories
            .map((category) => (
              <div
                key={category.id}
                className="group relative flex flex-col items-center"
              >
                {/* Image Circle Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-white bg-zinc-100 shadow-sm transition-all duration-300 group-hover:border-orange-500 group-hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                  <Image
                    src={category.category_image}
                    alt={category.category_name}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                </div>

                {/* Text Content */}
                <div className="mt-4 text-center">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {category.category_name}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {category.description}
                  </p>
                </div>
              </div>
            ))
            .splice(0, 6)}
        </div>
      </div>
    </section>
  );
}
