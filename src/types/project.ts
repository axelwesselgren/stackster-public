import { StackComponent } from "@/types/component";

export interface Project {
    id: string;
    orgId: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ProjectResponse = {
    message: string;
    code: number;
    project?: Project | null;
    projects?: Project[] | null;
    component?: StackComponent | null;
    components?: StackComponent[] | null;
};