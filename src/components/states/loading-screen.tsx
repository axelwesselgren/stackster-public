import { LoaderCircle } from "lucide-react";

function LoadingScreen() {
  return (
    <div className="h-full flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
}

export { LoadingScreen };