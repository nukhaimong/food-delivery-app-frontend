import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-xl font-semibold">Page not found</p>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Go back home
      </Link>
    </div>
  );
}
