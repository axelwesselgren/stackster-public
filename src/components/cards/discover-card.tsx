import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DiscoverComponent } from "@/types/component";
import { LinkDiscoverCompDialog } from "@/components/dialogs/link-discover-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function DiscoverCard({ component }: { component: DiscoverComponent }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{component.name}</CardTitle>
        <CardDescription>{component.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary">{component.tag}</Badge>
      </CardContent>
      <CardFooter>
        <LinkDiscoverCompDialog component={component}>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add to Project
          </Button>
        </LinkDiscoverCompDialog>
      </CardFooter>
    </Card>
  );
}

export { DiscoverCard };