import { 
  Dialog, 
  DialogContent,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateKeyForm } from "../forms/create-key-form";
import { Key } from "@/types/key";

function CreateKeyDialog({ updateKey }: { updateKey: (key: Key) => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Secret
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <CreateKeyForm updateKey={updateKey} />
      </DialogContent>
    </Dialog>
  );
}

export { CreateKeyDialog };