import { useState, useEffect } from "react";
import _ from "underscore";
import { useGetProjectsList } from "../api/queries/Dashboard.queries";
import { LS_SELECTED_PROJECT_MODULES } from "../constants/LocalStorage.constant";
import { ProjectsList } from "../types/DashboardData.type";
import { arrayLocalStorage } from "../utils/LocalStorage.util";

export const useProjectsList = () => {
  const [projectsList, setProjectsList] = useState<ProjectsList>();
  const [selectedProjectModules, setSelectedProjectModules] = useState<string[]>([]);

  const { data: projectsListRes } = useGetProjectsList();

  useEffect(() => {
    const lsProjectModules = arrayLocalStorage(LS_SELECTED_PROJECT_MODULES).get();

    if (projectsListRes) {
      setProjectsList(projectsListRes);

      if (lsProjectModules) {
        setSelectedProjectModules(lsProjectModules);
      } else {
        const projectModules = projectsListRes.map((project) => project.module);
        setSelectedProjectModules(projectModules);
        arrayLocalStorage(LS_SELECTED_PROJECT_MODULES).init(projectModules);
      }
    }
  }, [projectsListRes]);

  const handleProjectModuleToggle = (module: string) => {
    if (selectedProjectModules.includes(module)) {
      if (selectedProjectModules.length === 1 && selectedProjectModules[0] === module) {
        return;
      }
      setSelectedProjectModules((selectedProjectModules) => _.without(selectedProjectModules, module));
      arrayLocalStorage(LS_SELECTED_PROJECT_MODULES).removeItem(module);
    } else {
      setSelectedProjectModules((selectedProjectModules) => [...selectedProjectModules, module].sort());
      arrayLocalStorage(LS_SELECTED_PROJECT_MODULES).addItem(module);
    }
  };

  return { projectsList, setProjectsList, selectedProjectModules, handleProjectModuleToggle };
};
