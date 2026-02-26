import Image from 'next/image';
import Link from 'next/link';

export interface Category {
  id: string;
  category_name: string;
  category_image: string;
  description: string;
}

interface CategoryProps {
  categories: Category[];
}

export default function AllCategoriesAdmin({ categories }: CategoryProps) {
  return (
    <section className="bg-transparent py-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories?.map((category) => (
            <Link href={`/cuisines/${category.id}`} key={category.id}>
              <div className="group flex flex-col h-full overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-all hover:border-orange-500 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                {/* Square Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={category.category_image}
                    alt={category.category_name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content Area - No more line-clamping, full description visible */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
                    {category.category_name}
                  </h3>

                  {/* Entire description can be seen here */}
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {category.description}
                  </p>

                  {/* Admin Metadata */}
                  <div className="mt-auto pt-4 text-[10px] font-mono text-zinc-400 dark:text-zinc-600 border-t border-zinc-100 dark:border-zinc-800 mt-4">
                    ID: {category.id}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
