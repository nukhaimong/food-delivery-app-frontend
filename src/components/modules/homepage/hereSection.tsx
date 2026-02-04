import Link from 'next/link';
import { Bike, Clock, MapPin } from 'lucide-react';

interface FoodHeroProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
}

export default function FoodHero({
  title = 'Delicious food, delivered fast',
  subtitle = 'Order from your favorite restaurants and get fresh meals delivered to your door in minutes.',
  primaryCtaText = 'Order Now',
  primaryCtaHref = '/restaurants',
}: FoodHeroProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-orange-50 to-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Text content */}
          <div>
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
              🍔 Food Delivery
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                <Bike className="h-5 w-5" />
                {primaryCtaText}
              </Link>

              <Link
                href="/restaurants"
                className="inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold transition hover:bg-orange-50"
              >
                Browse Restaurants
              </Link>
            </div>

            {/* Features */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                Fast delivery
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                Live tracking
              </div>
              <div className="flex items-center gap-2">
                <Bike className="h-4 w-4 text-orange-500" />
                Hot & fresh
              </div>
            </div>
          </div>

          {/* Visual placeholder */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 rounded-3xl bg-orange-100" />
            <div className="relative flex h-full items-center justify-center rounded-3xl bg-white p-12 shadow-xl">
              <span className="text-6xl">🍕🍟🍜</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
