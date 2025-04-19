"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { TeamSwitcher } from "@/components/layout/team-switcher";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/auth-client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TeamSelectionCard } from "@/components/cards/team-selection";
import { LoadingScreen } from "@/components/states/loading-screen";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  
  const { 
    data: activeOrg,
    isPending
  } = authClient.useActiveOrganization();

  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b dark:border-neutral-900">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs/>
          </div>
          <div className="ml-auto mr-4">
          {!isMobile && <TeamSwitcher />}
          </div>
        </header>
        {isPending ? (
          <LoadingScreen />
        ) : (
          !activeOrg ? (
            <div className="h-full flex items-center justify-center">
              <div className="max-w-md w-full mx-auto p-4">
                <TeamSelectionCard />
              </div>
            </div>
          ) : (
            <div className="p-6 h-full">
              {children}
            </div>
          )
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

