import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Roles } from '@/constant/roles';
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
  let userRole = data.user.user_role;

  return (
    <SidebarProvider className="gap-24">
      <AppSidebar userRole={userRole} />
      {userRole === Roles.provider
        ? provider
        : userRole === Roles.admin
          ? admin
          : user}
    </SidebarProvider>
  );
}
