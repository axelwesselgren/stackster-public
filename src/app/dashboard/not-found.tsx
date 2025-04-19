import { ErrorScreen } from "@/components/states/error-screen";
import { Button } from "@/components/ui/button";
import { MoveLeft, FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center px-4 h-full">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="relative rounded-full p-4 bg-primary/10 text-primary">
              <FileQuestion className="h-16 w-16 " />
            </div>
          </div>
        </div>

        <ErrorScreen
          title="Page Not Found"
          message="The page you're looking for doesn't exist or has been moved."
        />

        <div className="mt-8">
          <Button asChild className="gap-2">
            <Link href="/">
              <MoveLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
