import Image from "next/image";

export interface Restaurant {
  id: string;
  name: string;
  image: string; // restaurant_image from backend
  cuisine?: string;
  rating?: number; // optional
  deliveryTime?: string; // optional
}

interface TopRestaurantsSectionProps {
  restaurants: Restaurant[];
}

export default function TopRestaurantsSection({ restaurants }: TopRestaurantsSectionProps) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
          Top Restaurants Near You
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="group overflow-hidden rounded-2xl border bg-white transition hover:shadow-lg"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold line-clamp-1">{restaurant.name}</h3>
                {restaurant.cuisine && (
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                    {restaurant.cuisine}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  {restaurant.rating && <span>⭐ {restaurant.rating}</span>}
                  {restaurant.deliveryTime && <span>{restaurant.deliveryTime}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}