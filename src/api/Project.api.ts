import { ProjectData } from "../types/DashboardData.type";
import ApiClient from "./ApiClient";

export const getProjectData = async (
  projectKey: string,
  signal: AbortSignal | undefined,
  walletAddress?: string,
): Promise<ProjectData> => {
  const response = await ApiClient.get(`projects/${projectKey}/${walletAddress}`, { signal });
  return response.data as ProjectData;
};

export const getProjectsList = async () => {
  const response = await ApiClient.get(`projects`);
  return response.data as string[];
};
