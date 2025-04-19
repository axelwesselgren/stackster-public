"use client"

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  Dialog 
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronsUpDown, Plus, LoaderCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { authClient } from "@/auth-client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function TeamSwitcher() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const { isMobile } = useSidebar();
  const { toast } = useToast();

  const { 
    data: organizations, 
    isPending: orgPending 
  } = authClient.useListOrganizations();
  const {
    data: activeOrg, 
    isPending: activePending
  } = authClient.useActiveOrganization();

  async function handleOrgChange(id: string) {
    const { data, error } = await authClient.organization.setActive({
      organizationId: id,
    }, {
      onRequest: (ctx) => {
      },
      onSuccess: (ctx) => {
      },
      onError: (ctx) => {
        toast({
          title: "Something went wrong",
          description: ctx.error.message
        });
      },
    });
  }

  async function handleOrgCreate() {
    if (!name || !slug) {
      toast({
        title: "Invalid input",
        description: "Please fill out all fields"
      });
      return;
    }

    const { data, error } = await authClient.organization.create({
      name,
      slug,
    }, {
      onRequest: (ctx) => {
        setLoading(true);
      },
      onSuccess: (ctx) => {
        setLoading(false);
      },
      onError: (ctx) => {
        setLoading(false);
        toast({
          title: "Something went wrong",
          description: ctx.error.message
        });
      },
    });
  }

  if (orgPending || activePending) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[75px]" />
        </div>
      </div>
    );
  }

  else if (organizations?.length === 0) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">
            <Plus/>
            Create org
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create an Organization</DialogTitle>
            <DialogDescription>
              Organizations are shared workspaces where teams can collaborate on projects.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input 
                id="name" 
                placeholder="Stackster Inc" 
                className="col-span-3" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                ID
              </Label>
              <Input 
                id="username" 
                placeholder="stackster" 
                className="col-span-3" 
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleOrgCreate}>
            {loading ? (
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
              >
                <LoaderCircle />
              </motion.div>
            ) : (
              "Create"
            )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  else if (!activeOrg) {
    return (
      <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              No team selected
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {organizations?.map((org, index) => (
              <DropdownMenuItem
                key={org.name}
                onClick={() => handleOrgChange(org.id)}
                className="gap-2 p-2 cursor-pointer"
                disabled={activeOrg?.id === org.id}
              >
                <div className="flex size-6 items-center justify-center rounded-sm">
                  <Avatar className="size-4 shrink-0 w-full h-full">
                    <AvatarImage src={org.logo ?? undefined} alt={org.name} />
                    <AvatarFallback>{org.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                {org.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-2" asChild>
              <Link href="/dashboard/teams/add" className={cn(buttonVariants({ variant: "ghost" }), "w-full cursor-pointer")}>
                <Plus/>
                Add a team
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Avatar className="size-4 shrink-0 w-full h-full">
                  <AvatarImage src={activeOrg?.logo ?? organizations[0]?.logo ?? undefined} alt={activeOrg?.name ?? "Organization"} />
                  <AvatarFallback>{activeOrg?.name.charAt(0).toUpperCase() ?? organizations[0].name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeOrg?.name ?? organizations[0].name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {organizations.map((org, index) => (
              <DropdownMenuItem
                key={org.name}
                onClick={() => handleOrgChange(org.id)}
                className="gap-2 p-2 cursor-pointer"
                disabled={activeOrg?.id === org.id}
              >
                <div className="flex size-6 items-center justify-center rounded-sm">
                  <Avatar className="size-4 shrink-0 w-full h-full">
                    <AvatarImage src={org.logo ?? undefined} alt={org.name} />
                    <AvatarFallback>{org.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                {org.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-2" asChild>
              <Link href="/dashboard/teams/add" className={cn(buttonVariants({ variant: "ghost" }), "w-full cursor-pointer")}>
                <Plus/>
                Add a team
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}