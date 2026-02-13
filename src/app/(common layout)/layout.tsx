import Footer from '@/components/layouts/footer';
import { Navbar } from '@/components/layouts/navbar';
import NavProfile from '@/components/navProfile';
import { userService } from '@/services/user.service';

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const session = data?.session;
  return (
    <div>
      <Navbar profile={<NavProfile />} session={session} />
      {children}
      <Footer />
    </div>
  );
}
