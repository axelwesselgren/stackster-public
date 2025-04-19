"use client";

import { useState } from "react";
import { Copy, LoaderCircle, MoreVertical, Settings, Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Project } from "@/types/project";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ContentPlaceholder() {
  return (
    <div className="relative h-full overflow-hidden rounded bg-muted">
      <svg className="absolute inset-0 h-full w-full stroke-muted-foreground/20" fill="none">
        <defs>
          <pattern id="pattern-1" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
          </pattern>
        </defs>
        <rect stroke="none" fill="url(#pattern-1)" width="100%" height="100%"></rect>
      </svg>
    </div>
  )
}

export function ProjectCards({
  projects,
  deleteProject,
  deletionLoading,
  duplicateProject
} : {
  projects: Project[],
  deleteProject: (id: string) => Promise<void>,
  deletionLoading: boolean,
  duplicateProject: (id: string) => Promise<void>,
}) {
  const [deleteText, setDeleteText] = useState("");

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
      {projects.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:border hover:border-neutral-700 hover:transition-colors duration-300 group relative">
          <Link href={`/dashboard/projects/${item.id}`} className="block">
            <CardContent className="p-0">
              <div className="h-20">
                <ContentPlaceholder />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description || "\u00A0"}</p>
              </div>
            </CardContent>
          </Link>
          <div className="absolute bottom-10 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => duplicateProject(item.id)} className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Copy size={14}/>
                    Duplicate
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Settings size={14}/>
                    Settings
                  </div>
                </DropdownMenuItem>
                <div className="
                  relative 
                  text-destructive 
                  flex 
                  cursor-default 
                  select-none 
                  items-center a
                  gap-2 
                  rounded-sm 
                  px-2 
                  py-1.5 
                  text-sm 
                  outline-none 
                  transition-colors 
                  focus:bg-accent 
                  focus:text-accent-foreground 
                  data-[disabled]:pointer-events-none 
                  data-[disabled]:opacity-50 
                  [&>svg]:size-4 
                  [&>svg]:shrink-0
                  cursor-pointer
                  hover:bg-accent
                ">
                  <Dialog onOpenChange={(isOpen) => !isOpen && setDeleteText("")}>
                    <DialogTrigger asChild>
                      <div className="flex items-center gap-2 w-full h-full">
                        <Trash size={14}/>
                        Delete
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Are You Sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone.
                          Type <span className="text-destructive">DELETE</span> to confirm
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="link" className="sr-only">
                            Link
                          </Label>
                          <Input
                            value={deleteText}
                            onChange={(e) => setDeleteText(e.target.value)}
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="destructive"
                          disabled={deleteText.toLowerCase() !== "delete" || deletionLoading}
                          onClick={() => {
                            deleteProject(item.id);
                            setDeleteText("");
                          }}
                          className="w-[80px]"
                        >
                          {deletionLoading ? <LoaderCircle className="animate-spin"/> : "Confirm"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
      ))}
    </div>
  );
}