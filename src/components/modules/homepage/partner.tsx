export function PartnerSection() {
  return (
    <section className="py-12 px-6 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2">
        {/* Restaurant Card */}
        <div className="relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 p-10 group border border-transparent hover:border-orange-500/30 transition-all">
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white">
              List your restaurant
            </h3>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-xs">
              Grow your business by reaching thousands of hungry customers near
              you.
            </p>
            <button className="mt-8 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600">
              Get Started
            </button>
          </div>
          <span className="absolute -right-4 -bottom-4 text-[120px] opacity-10 group-hover:scale-110 transition-transform">
            🍳
          </span>
        </div>

        {/* Rider Card */}
        <div className="relative overflow-hidden rounded-3xl bg-orange-500 p-10 group text-white">
          <div className="relative z-10">
            <h3 className="text-3xl font-black">Ride with HAANG</h3>
            <p className="mt-4 text-orange-50 opacity-90 max-w-xs">
              Become a delivery hero, enjoy flexible hours, and competitive
              earnings.
            </p>
            <button className="mt-8 rounded-xl bg-white px-6 py-3 font-bold text-orange-500 transition hover:bg-orange-50">
              Sign Up Now
            </button>
          </div>
          <span className="absolute -right-4 -bottom-4 text-[120px] opacity-20 group-hover:scale-110 transition-transform">
            🚲
          </span>
        </div>
      </div>
    </section>
  );
}
