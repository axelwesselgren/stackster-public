import { useState } from "react";
import { 
  Select, 
  SelectValue, 
  SelectTrigger, 
  SelectContent, 
  SelectGroup,
  SelectItem
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { DiscoverComponent } from "@/types/component";
import { useProjectFunctions } from "@/functions/client/project-functions";
import { useProjects } from "@/hooks/use-projects";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";


function LinkDiscoverCompDialog({
  component,
  children
}: {
  component: DiscoverComponent;
  children: React.ReactNode;
}) {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const { linkDiscoverComp } = useProjectFunctions();
  const { projects } = useProjects();

  return (
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to a project</DialogTitle>
          <DialogDescription>
            Select the project you want to add this component to
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4 w-full">
            <Label htmlFor="type" className="col-span-3">
              Project
            </Label>
            <Select value={link} onValueChange={(e) => setLink(e)}>
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder="Choose project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {projects &&
                    projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={async () => {
              setLoading(true);
              await linkDiscoverComp({ component, projectId: link });
              setLoading(false);
            }}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" size={24} />
            ) : (
              "Add"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { LinkDiscoverCompDialog };
