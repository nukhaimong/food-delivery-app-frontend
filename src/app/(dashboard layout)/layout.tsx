import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { userService } from '@/services/user.service';

export default async function DashBoardLayout({
  admin,
  user,
  provider,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
  provider: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  let userRole = data?.user?.user_role;

  return (
    <SidebarProvider className="gap-8">
      <AppSidebar userRole={userRole} />
      {admin}
      {provider}
      {user}
    </SidebarProvider>
  );
}
