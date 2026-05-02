import { Apple, Play } from 'lucide-react';

export function AppPromo() {
  return (
    <section className="py-24 px-6 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl rounded-[3rem] bg-zinc-900 dark:bg-orange-500 px-8 py-16 text-center text-white lg:px-20 lg:text-left">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black sm:text-5xl leading-tight">
              Food delivery at your{' '}
              <span className="text-orange-500 dark:text-zinc-900">
                fingertips.
              </span>
            </h2>
            <p className="mt-6 text-lg text-zinc-400 dark:text-orange-50">
              Download the HAANG app for a faster checkout experience and
              exclusive mobile-only offers.
            </p>
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="flex items-center gap-3 rounded-2xl bg-white px-6 py-3 text-zinc-900 transition hover:scale-105">
                <Apple className="h-6 w-6" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold">Download on</p>
                  <p className="text-sm font-black">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-3 rounded-2xl border-2 border-zinc-700 dark:border-orange-400 bg-transparent px-6 py-3 text-white transition hover:scale-105">
                <Play className="h-6 w-6 fill-current" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold">Get it on</p>
                  <p className="text-sm font-black">Google Play</p>
                </div>
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block h-[400px]">
            {/* Mockup Placeholder */}
            <div className="absolute right-0 top-0 h-[450px] w-[220px] rounded-[2.5rem] border-[8px] border-zinc-800 bg-zinc-800 shadow-2xl overflow-hidden">
              <div className="h-full w-full bg-gradient-to-b from-orange-400 to-orange-600 flex items-center justify-center">
                <span className="text-4xl">🥘</span>
              </div>
            </div>
            <div className="absolute right-32 bottom-0 h-[380px] w-[200px] rounded-[2.5rem] border-[8px] border-zinc-700 bg-zinc-700 shadow-2xl overflow-hidden">
              <div className="h-full w-full bg-zinc-900 flex items-center justify-center">
                <span className="text-4xl">🥗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
