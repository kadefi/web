import { useQuery } from "react-query";
import { ProjectData, WalletData } from "../types/DashboardData.type";
import { PROJECT_KEY } from "../types/Project.type";
import ApiClient from "./ApiClient";

const PROJECT_QUERY_KEY = "PROJECT_QUERY_KEY";

export const useGetProjectData = (
  walletAddress: string,
  projectKey: PROJECT_KEY
) => {
  return useQuery(
    [PROJECT_QUERY_KEY, walletAddress, projectKey],
    async () => {
      if (walletAddress.length === 0) {
        return;
      }

      return ApiClient.get(`projects/${projectKey}/${walletAddress}`);
    },
    {
      select: (response: any) => {
        if (response.data) {
          return response.data as ProjectData;
        }

        return;
      },
    }
  );
};
