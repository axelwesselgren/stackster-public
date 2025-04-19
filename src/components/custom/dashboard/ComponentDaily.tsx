import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Star } from "lucide-react";
import { LinkDiscoverCompDialog } from "@/components/dialogs/link-discover-dialog";

function ComponentOfTheDay({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const component = {
    id: "6bde83c6-6646-43b8-b6b0-d81b46d59dce",
    name: "Redis",
    description: "Used for caching",
    setup: "redis.config",
    createdAt: "2025-03-27T13:18:30.182Z",
    updatedAt: "2025-03-27T13:18:30.182Z"
  }

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Component of the day</CardTitle>
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary font-medium">
            <Star className="h-3 w-3 mr-2" />
            Featured
          </Badge>
        </div>
        <CardDescription>May be the next piece you&apos;re looking for</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md border p-4 bg-muted/50">
            <div className="h-[150px] flex items-center justify-center">
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{component.name}</div>
              <p className="text-sm text-muted-foreground mt-1">{component.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <LinkDiscoverCompDialog component={component}>
                <Button variant="outline" size="sm">
                  <Copy className="mr-2 h-3.5 w-3.5" />
                  Copy
                </Button>
              </LinkDiscoverCompDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { ComponentOfTheDay };
