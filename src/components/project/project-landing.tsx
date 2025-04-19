import { Lightbulb, PlusCircle, Rocket, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

function FeatureCard({ 
  icon, 
  title, 
  description 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 border border-neutral-300 dark:border-neutral-900 rounded-lg shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function ProjectLanding() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold">Welcome to Your Project Dashboard</h1>
        <p className="text-xl">It looks like you haven&apos;t created any projects yet. Let&apos;s get started!</p>
        <Link href="/dashboard/projects/create" className={cn(buttonVariants({ size: "lg" }), "mt-6")}>
          <div className="flex items-center">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Your First Project
          </div>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <FeatureCard
            icon={<Rocket className="h-8 w-8 text-blue-500" />}
            title="Quick Start"
            description="Get your project up and running in minutes with our intuitive setup process."
          />
          <FeatureCard
            icon={<Lightbulb className="h-8 w-8 text-yellow-500" />}
            title="Inspiring Templates"
            description="Choose from a variety of templates to kickstart your creativity."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-green-500" />}
            title="Collaboration"
            description="Invite team members and work together seamlessly on your projects."
          />
        </div>
      </div>
    </div>
  );
}