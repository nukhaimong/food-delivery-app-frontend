import { SearchX, Utensils, ArrowRight, Pizza } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EmptyMealForCuisine() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 px-4">
      <div className="flex flex-col items-center justify-center p-10 md:p-24 rounded-[3.5rem] bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-100 dark:border-zinc-800 shadow-2xl text-center overflow-hidden relative">
        {/* Background Decorative Element */}
        <div className="absolute -top-10 -right-10 opacity-10 dark:opacity-5 rotate-12">
          <Pizza size={200} className="text-orange-500" />
        </div>

        {/* Icon with Soft Glow */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-orange-400/30 blur-2xl rounded-full scale-150 group-hover:bg-orange-400/50 transition-all duration-500" />
          <div className="relative bg-white dark:bg-zinc-800 p-8 rounded-full shadow-xl">
            <SearchX size={56} className="text-zinc-400 dark:text-zinc-500" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
            STILL <span className="text-orange-500">COOKING...</span>
          </h2>

          <p className="mt-4 text-zinc-500 dark:text-zinc-400 font-medium max-w-sm mx-auto text-lg">
            We couldn't find any dishes in this category right now. Don't worry,
            there's plenty more to explore!
          </p>

          {/* Customer Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/foods">
              <Button className="h-14 px-10 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-all shadow-lg hover:shadow-orange-500/20 gap-3 group">
                EXPLORE ALL FOOD
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>

            <Link href="/cuisines">
              <Button
                variant="ghost"
                className="h-14 px-8 font-bold text-zinc-600 dark:text-zinc-300 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                CHANGE CUISINE
              </Button>
            </Link>
          </div>
        </div>

        {/* Social Proof / Trust Badge */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 w-full max-w-md">
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-zinc-900 dark:text-white">
                50+
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Kitchens
              </span>
            </div>
            <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-zinc-900 dark:text-white">
                1k+
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Happy Foodies
              </span>
            </div>
            <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-zinc-900 dark:text-white">
                24/7
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Deliveries
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
