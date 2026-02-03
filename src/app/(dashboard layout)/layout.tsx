import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Roles } from '@/constant/roles';

export default function DashBoardLayout({
  admin,
  user,
  provider,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
  provider: React.ReactNode;
}) {
  let userRole = Roles.user;

  return (
    <SidebarProvider>
      <AppSidebar userRole={Roles.provider} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {userRole === Roles.provider
            ? provider
            : userRole === Roles.admin
              ? admin
              : user}
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
