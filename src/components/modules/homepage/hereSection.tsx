import Link from 'next/link';
import Image from 'next/image';
import { Bike, Clock, MapPin, Star, ShieldCheck } from 'lucide-react';

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
    <section className="relative overflow-hidden py-20 px-6 dark:bg-zinc-950">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-orange-500/10 blur-[120px] rounded-full" />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 dark:bg-orange-950/30 px-4 py-1.5 text-sm font-bold text-orange-600 dark:text-orange-500">
              <ShieldCheck className="h-4 w-4" />
              #1 Food Delivery in City
            </span>

            <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-7xl text-zinc-900 dark:text-white leading-[1.1]">
              {title.split(',').map((part, i) => (
                <span
                  key={i}
                  className={i === 1 ? 'text-orange-500 block' : 'block'}
                >
                  {part}
                  {i === 0 && ','}
                </span>
              ))}
            </h1>

            <p className="mt-8 max-w-lg text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-orange-600 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
              >
                <Bike className="h-5 w-5" />
                {primaryCtaText}
              </Link>

              <Link
                href="/restaurants"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 px-8 py-4 text-lg font-bold transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                Browse Menu
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-zinc-100 dark:border-zinc-800 pt-8">
              <div>
                <p className="text-2xl font-black text-zinc-900 dark:text-white">
                  12k+
                </p>
                <p className="text-sm text-zinc-500">Happy Customers</p>
              </div>
              <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <p className="text-2xl font-black text-zinc-900 dark:text-white">
                  4.8
                </p>
                <div className="flex gap-0.5 text-orange-500">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual (The "Better" Part) */}
          <div className="relative hidden lg:block h-[600px]">
            {/* Main Image Base */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-transparent animate-pulse" />
            </div>

            {/* Floating Card 1: Delivery Status */}
            <div className="absolute top-10 left-10 z-30 animate-bounce [animation-duration:5s]">
              <div className="flex items-center gap-4 rounded-3xl bg-white/80 dark:bg-zinc-900/80 p-4 shadow-2xl backdrop-blur-xl border border-white dark:border-zinc-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    Delivery
                  </p>
                  <p className="text-sm font-black dark:text-white text-zinc-900">
                    30 Mins
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card 2: Popular Dish */}
            <div className="absolute bottom-20 right-0 z-30 animate-bounce [animation-duration:6s]">
              <div className="rounded-3xl bg-white/80 dark:bg-zinc-900/80 p-5 shadow-2xl backdrop-blur-xl border border-white dark:border-zinc-800 w-48">
                <div className="h-32 w-full rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-3 overflow-hidden">
                  <span className="flex h-full items-center justify-center text-4xl">
                    🍕
                  </span>
                </div>
                <p className="font-black text-zinc-900 dark:text-white">
                  Cheesy Pizza
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-orange-500 font-bold">$12.99</p>
                  <div className="flex items-center text-[10px] text-zinc-400 font-bold">
                    <Star className="h-3 w-3 fill-orange-500 text-orange-500 mr-1" />{' '}
                    4.9
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 3: Live Map Marker */}
            <div className="absolute top-1/2 left-0 z-20 -translate-y-1/2 animate-pulse">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-zinc-900 shadow-xl border-4 border-orange-500">
                <MapPin className="h-6 w-6 text-orange-500" />
              </div>
            </div>

            {/* Main Center Image Holder */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-[180px] filter drop-shadow-2xl hover:scale-110 transition-transform duration-500 cursor-pointer">
                🍱
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
