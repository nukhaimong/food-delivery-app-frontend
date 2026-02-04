import Image from 'next/image';

export interface Category {
  id: string;
  name: string;
  image: string; // image URL from backend
}

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
          Browse by category
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer rounded-2xl border bg-white p-4 transition hover:shadow-md dark:bg-gray-300"
            >
              <div className="relative mx-auto mb-3 h-20 w-20">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain transition group-hover:scale-105"
                />
              </div>

              <p className="text-center text-sm font-medium dark:text-black">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
