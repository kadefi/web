import { ProjectData } from "../types/DashboardData.type";
import ApiClient from "./ApiClient";

export const getProjectData = async (
  projectKey: string,
  walletAddress: string,
  signal: AbortSignal | undefined,
): Promise<ProjectData> => {
  const response = await ApiClient.get(`projects/${projectKey}/${walletAddress}?cache=false`, { signal });
  return response.data as ProjectData;
};

export const getProjectsList = async () => {
  const response = await ApiClient.get(`projects`);
  return response.data as string[];
};
