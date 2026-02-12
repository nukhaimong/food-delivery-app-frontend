import Footer from '@/components/layouts/footer';
import { Navbar } from '@/components/layouts/navbar';
import NavProfile from '@/components/navProfile';

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar profile={<NavProfile />} />
      {children}
      <Footer />
    </div>
  );
}
