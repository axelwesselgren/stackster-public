"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/layout/nav-main";
import { NavSecondary } from "@/components/layout/nav-secondary";
import { NavUser } from "@/components/layout/nav-user";
import { WrappedLogo } from "@/components/icons/logo";
import { TeamSwitcher } from "@/components/layout/team-switcher";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar() {
  const isMobile = useIsMobile();

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="flex items-start p-3">
        <WrappedLogo scale={1} adjusted={false} />
      </SidebarHeader>
      {isMobile && (
        <div className="mr-1 ml-1">
          <TeamSwitcher />
        </div>
      )}
      <SidebarContent>
        <NavMain/>
        <NavSecondary />
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator/>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}
