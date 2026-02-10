'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';

export default function CartPage() {
  const { items, addToCart, updateQuantity, removeFromCart, getTotalPrice } =
    useCartStore();

  // Logic to handle calculations
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08; // 8% Tax
  const deliveryFee = items.length > 0 ? 4.99 : 0;
  const total = subtotal + tax + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center space-y-4 px-6 text-center">
        <div className="rounded-full bg-zinc-100 p-8 dark:bg-zinc-900">
          <ShoppingBag className="h-16 w-16 text-zinc-300" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          Your cart is empty
        </h2>
        <p className="max-w-xs text-zinc-500">
          Looks like you haven't added any delicious meals to your tray yet.
        </p>
        <Button
          asChild
          className="mt-6 bg-orange-500 px-8 py-6 text-lg hover:bg-orange-600"
        >
          <Link href="/">Discover Meals</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 mt-16">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-orange-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Ordering
      </Link>

      <div className="flex items-baseline gap-4 mb-10">
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Cart
        </h1>
        <span className="text-lg text-zinc-400 font-medium">
          ({items.length} items)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Cart Items List */}
        <div className="lg:col-span-7 space-y-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-zinc-100 dark:border-zinc-800"
            >
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-[2rem] bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={item.image_url}
                  alt={item.meal_name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>

              <div className="flex flex-1 flex-col text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {item.meal_name}
                  </h3>
                  <p className="text-lg font-black text-orange-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 mb-1">
                  {item.category.category_name}
                </p>
                <p className="text-sm text-zinc-500 line-clamp-1 italic mb-4">
                  {item.provider.providerProfile.restaurant_name}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-6">
                  {/* Qty Toggle */}
                  <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-800 rounded-full px-4 py-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-zinc-500 hover:text-orange-600 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-4 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-zinc-500 hover:text-orange-600 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Summary */}
        <div className="lg:col-span-5">
          <div className="rounded-[2.5rem] bg-zinc-50 p-10 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold mb-8">Summary</h2>

            <div className="space-y-6 text-md">
              <div className="flex justify-between text-zinc-500">
                <span>Items Subtotal</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Tax (8%)</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Delivery Fee</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  ${deliveryFee.toFixed(2)}
                </span>
              </div>

              <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-6" />

              <div className="flex justify-between text-2xl font-black">
                <span>Total</span>
                <span className="text-orange-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full mt-10 bg-orange-500 hover:bg-orange-600 h-16 text-lg font-black rounded-2xl shadow-lg shadow-orange-500/30 transition-all active:scale-[0.98]">
              Checkout Now
            </Button>

            <div className="mt-8 flex items-center justify-center gap-2 text-zinc-400">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[10px] font-medium uppercase tracking-widest">
                Secure Payment Powered by Stripe
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
