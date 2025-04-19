import { Key } from "@/types/key";

interface DiscoverComponent {
  id: string,
  name: string,
  description: string,
  tag: string
}

interface DBComponent {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  setup?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface StackComponent {
  id: string;
  projectId: string;
  name: string;
  description: string;
  setup: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { 
  DBComponent,
  StackComponent,
  DiscoverComponent
};