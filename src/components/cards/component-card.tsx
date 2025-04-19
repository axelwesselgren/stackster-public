import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StackComponent } from "@/types/component";
import { KeyLinkDialog } from "@/components/dialogs/key-link-dialog";
import { Label } from "@/components/ui/label";
import { Key } from "@/types/key";
import { KeyShowDialog } from "@/components/dialogs/key-show-dialog";

function ComponentCard({
  component,
}: {
  component: StackComponent;
}) {

  return (
    <Card key={component.id} className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{component.name}</CardTitle>
        </div>
        <CardDescription>{component.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Instructions</Label>
          <div className="bg-secondary p-3 rounded-md">
            <code className="text-sm">{component.setup}</code>
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Keys</Label>
          <div className="items-center flex space-x-2">
            <KeyShowDialog componentId={component.id}/>
            <KeyLinkDialog component={component} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { ComponentCard };
