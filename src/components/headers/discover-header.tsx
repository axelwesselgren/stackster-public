import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function DiscoverHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">Components</h1>
        <p className="text-muted-foreground mt-1">
          Add pre-built components to your project
        </p>
      </div>
      <div className="relative">
        <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search components..."
          className="pl-8 w-full sm:w-[300px]"
        />
      </div>
    </div>
  );
}

export { DiscoverHeader };