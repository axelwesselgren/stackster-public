import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StackComponent } from "@/types/component";
import { Key } from "@/types/key";
import { LoaderCircle, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useKeyFunctions } from "@/functions/client/key-functions";

type KeyLinkDialogProps = {
  keys: Key[];
  component: StackComponent;
};

function KeyLinkDialog({
  keys,
  component,
}: KeyLinkDialogProps) {
  const [key, setKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { handleLinking } = useKeyFunctions();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Plus/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign new key</DialogTitle>
          <DialogDescription>Link a key from your vault</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4 w-full">
            <Label htmlFor="type" className="col-span-3">
              Type
            </Label>
            <Select value={key ?? ""} onValueChange={(e) => setKey(e)}>
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder="Choose key" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {keys && keys.map((key) =>
                    component.keys?.find((k) => k.id === key.id) ? null : (
                      <SelectItem key={key.id} value={key.id}>
                        {key.name}
                      </SelectItem>
                    )
                  )}
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

              if (!key) return;
              await handleLinking({ keyId: key, component });
              
              setLoading(false);
            }}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" size={24} />
            ) : (
              "Assign Key"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { KeyLinkDialog };
