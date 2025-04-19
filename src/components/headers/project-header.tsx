import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

function ProjectHeader({ name }: { name: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-muted-foreground mt-1">
          Manage components and configurations
        </p>
      </div>
      <Button variant="outline" className="self-start sm:self-auto">
        <Settings className="mr-2 h-4 w-4" />
        Project Settings
      </Button>
    </div>
  );
}

export { ProjectHeader };