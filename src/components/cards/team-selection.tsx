import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { TeamSwitcher } from "@/components/layout/team-switcher";

function TeamSelectionCard() {
  return (
    <Card className="border-border shadow-md">
      <CardHeader className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Select a team</CardTitle>
        <CardDescription>
          You need to select a team to continue. Choose an existing team or
          create a new one.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <TeamSwitcher />
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline" size="sm">
          Create a new team
        </Button>
      </CardFooter>
    </Card>
  );
}

export { TeamSelectionCard };
