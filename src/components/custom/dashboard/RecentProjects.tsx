import { Card, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Clock, ExternalLink, Plus } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { format } from "timeago.js";
import Link from "next/link";
import { cn } from "@/lib/utils";

function RecentProjects({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { projects } = useProjects();

  const sortedProjects = projects
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recently updated projects</CardTitle>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Projects you&apos;ve recently worked on
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-4">
            {sortedProjects.map((project) => (
              <div key={project.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {format(project.updatedAt)}
                      </div>
                    </div>
                  </div>
                  <Link 
                    href={`/dashboard/projects/${project.id}`} 
                    className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                  >
                    <ExternalLink />
                  </Link>
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export { RecentProjects };
