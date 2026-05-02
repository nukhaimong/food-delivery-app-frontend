import { Bike, Search, ShoppingBag } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      title: 'Choose Dish',
      desc: 'Select from thousands of options',
      icon: <Search />,
      color: 'bg-orange-500',
    },
    {
      title: 'Easy Payment',
      desc: 'Pay with cash or card securely',
      icon: <ShoppingBag />,
      color: 'bg-zinc-900 dark:bg-zinc-800',
    },
    {
      title: 'Fast Delivery',
      desc: 'Get it delivered in 30 minutes',
      icon: <Bike />,
      color: 'bg-orange-500',
    },
  ];

  return (
    <section className="py-24 px-6 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white sm:text-5xl">
            How it Works
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Your favorite meals delivered in just three simple steps.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center text-center"
            >
              <div
                className={`mb-6 flex h-20 w-20 items-center justify-center rounded-3xl text-white shadow-lg transition-transform group-hover:scale-110 ${step.color}`}
              >
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-[250px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
