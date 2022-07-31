import { useState, useEffect } from "react";
import _ from "underscore";
import { trackDisabledIntegration } from "../analytics/Analytics.util";
import { useGetProjectsList } from "../api/queries/Dashboard.queries";
import { LS_DISABLED_PROJECT_MODULES, LS_SELECTED_PROJECT_MODULES } from "../constants/LocalStorage.constant";
import { ProjectsList } from "../types/DashboardData.type";
import { arrayLocalStorage } from "../utils/LocalStorage.util";

export const useProjectsList = () => {
  const [projectsList, setProjectsList] = useState<ProjectsList>();
  const [selectedProjectModules, setSelectedProjectModules] = useState<string[]>([]);

  const { data: projectsListRes } = useGetProjectsList();

  useEffect(() => {
    const disabledProjectModules = arrayLocalStorage(LS_DISABLED_PROJECT_MODULES).get();
    arrayLocalStorage(LS_SELECTED_PROJECT_MODULES).destroy();

    if (projectsListRes) {
      setProjectsList(projectsListRes);
      const projectModules = projectsListRes.map((project) => project.module);

      if (disabledProjectModules.length > 0) {
        setSelectedProjectModules(_.difference(projectModules, disabledProjectModules));
      } else {
        setSelectedProjectModules(projectModules);
      }
    }
  }, [projectsListRes]);

  const handleProjectModuleToggle = (module: string) => {
    if (selectedProjectModules.includes(module)) {
      if (selectedProjectModules.length === 1 && selectedProjectModules[0] === module) {
        return;
      }
      setSelectedProjectModules((selectedProjectModules) => _.without(selectedProjectModules, module));
      trackDisabledIntegration({ key: LS_DISABLED_PROJECT_MODULES, action: "add", module });
      arrayLocalStorage(LS_DISABLED_PROJECT_MODULES).addItem(module);
    } else {
      setSelectedProjectModules((selectedProjectModules) => [...selectedProjectModules, module].sort());
      trackDisabledIntegration({ key: LS_DISABLED_PROJECT_MODULES, action: "remove", module });
      arrayLocalStorage(LS_DISABLED_PROJECT_MODULES).removeItem(module);
    }
  };

  return { projectsList, setProjectsList, selectedProjectModules, handleProjectModuleToggle };
};
