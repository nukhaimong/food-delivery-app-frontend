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
import { useForm } from '@tanstack/react-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import z from 'zod';

const orderSchema = z.object({
  delivery_address: z
    .string('derivery address is required')
    .min(10, 'Minimum 10 characters is required for delivery address'),
  phone_number: z
    .string('phone number is required')
    .min(10, 'Minimum 11 numbers is required for delivery address'),
});

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
    useCartStore();

  console.log(items);

  const form = useForm({
    defaultValues: {
      delivery_address: '',
      phone_number: '',
    },
    validators: {
      onSubmit: orderSchema,
    },
    onSubmit: async ({ value }) => {
      const cartData = {
        OrderItems: items.map((item) => ({
          providerProvider_Id: item.provider.providerProfile.providerProfileId,
          meal_id: item.meal_id,
          quantity: item.quantity,
          price: item.price,
          delivery_address: value.delivery_address,
          phone_number: value.phone_number,
        })),
      };

      console.log('Sending to backend:', cartData);

      const loadingId = toast.loading('Processing order...');

      toast.dismiss(loadingId);
      toast.success('Order placed successfully!');
      clearCart();
    },
  });

  const subtotal = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center space-y-4 px-6 text-center">
        <div className="rounded-full bg-zinc-100 p-8 dark:bg-zinc-900">
          <ShoppingBag className="h-16 w-16 text-zinc-300" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Your cart is empty
        </h2>
        <Button
          asChild
          className="mt-6 bg-orange-500 px-8 py-6 text-lg hover:bg-orange-600"
        >
          <Link href="/">Browse Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 mt-16">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Continue Ordering
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Order Items */}
        <div className="lg:col-span-7">
          <h1 className="text-4xl font-black mb-10 tracking-tight">
            Your Order
          </h1>
          <div className="space-y-8">
            {items.map((item) => (
              <div
                key={item.meal_id}
                className="flex items-center gap-6 pb-8 border-b border-zinc-100 dark:border-zinc-800"
              >
                <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-[2rem] bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={item.image_url}
                    alt={item.meal_name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.meal_name}</h3>
                  <p className="text-sm text-zinc-500 italic">
                    {item.provider.providerProfile.restaurant_name}
                  </p>

                  <div className="mt-4 flex items-center gap-6">
                    <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-800 rounded-full px-4 py-1.5">
                      <button
                        onClick={() => updateQuantity(item.meal_id, -1)}
                        className="hover:text-orange-500 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-black w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.meal_id, 1)}
                        className="hover:text-orange-500 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.meal_id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-orange-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Delivery Form & Checkout Summary */}
        <div className="lg:col-span-5">
          <div className="rounded-[2.5rem] bg-zinc-50 p-8 lg:p-10 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl sticky top-24">
            <h2 className="text-2xl font-bold mb-8">Delivery Details</h2>

            <form
              id="checkout-form"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-6"
            >
              <form.Field
                name="delivery_address"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                        Address
                      </FieldLabel>
                      <Input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="12 No Road, Dhanmondi"
                        className="rounded-2xl h-12"
                      />
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className="text-red-500 text-xs mt-1"
                        />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="phone_number"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                        Phone
                      </FieldLabel>
                      <Input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="rounded-2xl h-12"
                      />
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className="text-red-500 text-xs mt-1"
                        />
                      )}
                    </Field>
                  );
                }}
              />
            </form>

            <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-8" />

            <div className="space-y-4">
              <div className="flex justify-between text-zinc-500 font-medium">
                <span>Subtotal</span>
                <span className="text-zinc-900 dark:text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-3xl font-black pt-4">
                <span>Total</span>
                <span className="text-orange-600">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  form="checkout-form"
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="w-full mt-10 bg-orange-500 hover:bg-orange-600 h-16 text-lg font-black rounded-2xl shadow-lg shadow-orange-500/30 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              )}
            />

            <div className="mt-8 flex items-center justify-center gap-2 text-zinc-400">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[10px] tracking-widest font-bold uppercase">
                Secure Checkout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
