import Footer from '@/components/layouts/footer';
import { Navbar } from '@/components/layouts/navbar';
import NavProfile from '@/components/navProfile';
import { userService } from '@/services/user.service';

export default async function CommonLayout({
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
