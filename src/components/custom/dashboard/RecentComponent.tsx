import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { format } from "timeago.js";
import Link from "next/link";
import { cn } from "@/lib/utils";

function RecentComponent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const component = {
    id: "6bde83c6-6646-43b8-b6b0-d81b46d59dce",
    projectId: "5451b1c8-ade1-4335-a908-9e9f8dc8b149",
    name: "Redis",
    description: "Used for caching",
    setup: "redis.config",
    createdAt: "2025-03-27T13:18:30.182Z",
    updatedAt: "2025-03-27T13:18:30.182Z"
  }
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Most recent component</CardTitle>
        <CardDescription>Updated {format(component.updatedAt)}</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <div className="space-y-4 h-full">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{component.name}</div>
            <Link href={`/dashboard/projects/${component.projectId}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              <ExternalLink className="mr-2 h-3.5 w-3.5" />
              View
            </Link>
          </div>
          <div className="rounded-md border bg-muted/50">
            <div className="h-[200px] flex items-center justify-center relative">

            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { RecentComponent };
