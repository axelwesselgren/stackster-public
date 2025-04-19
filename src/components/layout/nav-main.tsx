"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useProjects } from "@/hooks/use-projects";
import {
  LayoutDashboard,
  Folder,
  Shield,
  ChevronRight,
  User,
  Settings,
  BarChart,
  Globe,
} from "lucide-react";
import Link from "next/link";

export function NavMain() {
  const { projects } = useProjects();

  return (
    <SidebarGroup className="gap-8">
      <div>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Overview">
              <Link href="/dashboard">
                <LayoutDashboard/>
                <span>Overview</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {projects?.length > 0 ? (   
            <Collapsible asChild>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Projects">
                  <Link href="/dashboard/projects">
                    <Folder/>
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {projects.map((project) => (
                        <SidebarMenuSubItem key={project.name}>
                          <SidebarMenuSubButton asChild>
                            <Link href={`/dashboard/projects/${project.id}`}>
                              <span>{project.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
           ) : (   
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Projects">
                <Link href="/dashboard/projects">
                  <Folder/>
                  <span>Projects</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Vault">
              <Link href="/dashboard/vault">
                <Shield/>
                <span>Vault</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Vault">
              <Link href="/dashboard/discover">
                <Globe/>
                <span>Discover</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

      <div>
        <SidebarGroupLabel>Organization</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Analytics">
              <Link href="/dashboard/team/analytics">
                <BarChart/>
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/dashboard/team/members">
                <User/>
                <span>Members</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/dashboard/team/settings">
                <Settings/>
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </SidebarGroup>
  )
}