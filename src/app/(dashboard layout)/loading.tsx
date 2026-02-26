export default function Loading() {
  return (
    <div className="p-6 lg:p-12 bg-zinc-50 dark:bg-zinc-950 min-h-screen mt-16">
      <div className="max-w-5xl mx-auto">
        {/* Skeleton Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-pulse">
          <div className="space-y-3">
            <div className="h-12 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
            <div className="h-6 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          </div>
          <div className="h-12 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
        </div>

        {/* Skeleton Orders List */}
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border-2 border-zinc-100 dark:border-zinc-800 p-8 lg:p-10 shadow-sm animate-pulse"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* 1. Left Section: Icon & ID */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
                    <div className="space-y-2">
                      <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
                      <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-zinc-50 dark:border-zinc-800">
                    <div className="h-5 w-3/4 bg-zinc-100 dark:bg-zinc-800/50 rounded" />
                    <div className="h-5 w-1/2 bg-zinc-100 dark:bg-zinc-800/50 rounded" />
                  </div>
                </div>

                {/* 2. Middle Section: Delivery Details */}
                <div className="lg:col-span-5 space-y-6 bg-zinc-50/50 dark:bg-zinc-800/30 p-6 rounded-[2rem]">
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="h-8 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="h-8 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                  </div>
                </div>

                {/* 3. Right Section: Buttons */}
                <div className="lg:col-span-3 flex flex-col justify-between items-end gap-6">
                  <div className="space-y-2 text-right">
                    <div className="h-3 w-20 ml-auto bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="h-10 w-24 ml-auto bg-zinc-200 dark:bg-zinc-800 rounded" />
                  </div>
                  <div className="w-full space-y-3">
                    <div className="h-16 w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
                    <div className="h-12 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
