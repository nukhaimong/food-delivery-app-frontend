import Footer from '@/components/layouts/footer';
import { Navbar } from '@/components/layouts/navbar';

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
