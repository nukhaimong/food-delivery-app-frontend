import { Utensils, PlusCircle } from 'lucide-react';

export default function NoMealsState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-white dark:bg-zinc-900 rounded-[2.5rem] border-2 border-dashed border-zinc-100 dark:border-zinc-800">
      <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-full mb-6">
        <Utensils size={48} className="text-orange-500" />
      </div>

      <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white">
        The kitchen is quiet<span className="text-orange-500">.</span>
      </h3>

      <p className="text-zinc-500 font-medium max-w-xs mt-2 mb-8">
        It looks like no meals have been prepared today. Time to stir things up!
      </p>
    </div>
  );
}
