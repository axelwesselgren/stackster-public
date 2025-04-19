import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";

function NoComponentState({ id }: { id: string }) {
  return (
    <Card className="border border-border/40 shadow-sm">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-20 h-20 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <Plus className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-3">No Components Yet</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Start building your project by adding your first component. Choose from already made components or create your own.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/dashboard/discover">
            <Button className="w-full sm:w-auto">Discover Components</Button>
          </Link>

          <Separator orientation="vertical" className="h-8 hidden sm:block" />

          <Link href={`/dashboard/projects/${id}/create`}>
            <Button variant="outline" className="w-full sm:w-auto">
              Custom Components
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export { NoComponentState };