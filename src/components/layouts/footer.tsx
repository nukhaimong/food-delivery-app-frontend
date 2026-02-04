import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="dark:bg-black bg-white px-6 py-12 border-t-2 dark:border-y-white border-black">
      <div className="mx-auto max-w-6xl grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-shadow-white">
        {/* Company Info */}
        <div>
          <h3 className="mb-4 text-lg font-bold">FoodExpress</h3>
          <p className="text-sm text-muted-foreground">
            Delivering your favorite meals fast and fresh.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/restaurants">Restaurants</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li>Pizza</li>
            <li>Burgers</li>
            <li>Chinese</li>
            <li>Desserts</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase">Follow Us</h4>
          <ul className="flex gap-4 text-sm">
            <li>
              <Link href="#">Facebook</Link>
            </li>
            <li>
              <Link href="#">Instagram</Link>
            </li>
            <li>
              <Link href="#">Twitter</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} FoodExpress. All rights reserved.
      </div>
    </footer>
  );
}
