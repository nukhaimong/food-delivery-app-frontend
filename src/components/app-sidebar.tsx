import * as React from 'react';

import { SearchForm } from '@/components/search-form';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Routes } from '@/types/routes.type';
import { Roles } from '@/constant/roles';
import { adminRoutes, providerRoutes, userRoutes } from '@/routes/routes';
import Link from 'next/link';

// This is sample data.
export function AppSidebar({
  userRole,
  ...props
}: {
  userRole: string & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Routes[] = [];

  switch (userRole) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.provider:
      routes = providerRoutes;
      break;
    case Roles.user:
      routes = userRoutes;
      break;
    default:
      routes = [];
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
