import { 
  createContext, 
  ReactNode, 
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { useComponents } from "@/hooks/use-components";
import { useKeys } from "@/hooks/use-keys";
import { useProjects } from "@/hooks/use-projects";
import { Project } from "@/types/project";
import { StackComponent } from "@/types/component";
import { Key } from "@/types/key";

interface ProjectContextType {
  setCurrentProjectId: Dispatch<SetStateAction<string>>;
  currentProject: Project | undefined;
  currentProjectId: string;
  projectError: Error | null;
  projectLoading: boolean;
  components: StackComponent[];
  compError: Error | null;
  compLoading: boolean;
  keys: Key[];
}

const ProjectContext = createContext<ProjectContextType>({
  setCurrentProjectId: () => {},
  currentProject: undefined,
  currentProjectId: "",
  projectError: null,
  projectLoading: false,
  components: [],
  compError: null,
  compLoading: false,
  keys: []
});

export function ProjectProvider({ children }: { children: ReactNode }) {
  const {
    setCurrentProjectId,
    currentProject,
    currentProjectId,
    error: projectError,
    loading: projectLoading
  } = useProjects();

  const {
    components,
    error: compError,
    loading: compLoading
  } = useComponents(currentProjectId);

  const {
    keys,
  } = useKeys();

  const value = {
    setCurrentProjectId,
    currentProject,
    currentProjectId,
    projectError,
    projectLoading,
    components,
    compError,
    compLoading,
    keys
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectContext = () => useContext(ProjectContext);