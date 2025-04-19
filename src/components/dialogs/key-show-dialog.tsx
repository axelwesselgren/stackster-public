import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { KeyItem } from "@/components/items/key-item";
import { Button } from "@/components/ui/button";
import { useKeyComponents } from "@/hooks/use-keys-components";
import { LoadingScreen } from "../states/loading-screen";

function KeyShowDialog({ componentId }: { componentId: string }) {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="secondary" size="sm">Show</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Keys</DialogTitle>
					<DialogDescription>These are the keys linked to your component</DialogDescription>
				</DialogHeader>
        <KeyShowContent componentId={componentId} />
				<DialogFooter></DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function KeyShowContent({ componentId }: { componentId: string }) {
  const {
    keys,
    updateKey,
    isPending
  } = useKeyComponents(componentId);

  if (isPending) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-2">
      {keys.map((key) => (
        <KeyItem
          keyItem={key}
          keys={keys}
          key={key.id}
          updatedKey={updateKey}
        />
      ))}
    </div>
  );
}

export { KeyShowDialog };