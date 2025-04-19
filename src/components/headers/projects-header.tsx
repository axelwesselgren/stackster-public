import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

function ProjectsHeader({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}) {
	return (
		<div>
			<div className="flex items-center justify-between">
				<h3 className="text-2xl font-semibold">Projects</h3>
				<Link href="/dashboard/projects/create" className={buttonVariants()}>
					<Plus className="mr-2 h-4 w-4" />
					Create Project
				</Link>
			</div>
			<div className="mt-4 relative">
				<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					className="pl-8"
					placeholder="Search projects..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
		</div>
	);
}



export { ProjectsHeader };