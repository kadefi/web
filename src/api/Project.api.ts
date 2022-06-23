import { ProjectData } from "../types/DashboardData.type";
import ApiClient from "./ApiClient";

export const getProjectData = async (projectKey: string, walletAddress: string): Promise<ProjectData> => {
  const response = await ApiClient.get(`projects/${projectKey}/${walletAddress}`);
  return response.data as ProjectData;
};
