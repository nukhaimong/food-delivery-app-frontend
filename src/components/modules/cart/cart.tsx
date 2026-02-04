import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  itemCount?: number;
}

export default function CartButton({ itemCount = 0 }: CartButtonProps) {
  return (
    <Link
      href="/cart"
      aria-label="Cart"
      className="relative inline-flex items-center justify-center rounded-full p-2 transition hover:bg-gray-800"
    >
      <ShoppingCart className="h-6 w-6" />

      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
