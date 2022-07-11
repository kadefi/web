import axios, { AxiosError } from "axios";
import { trackRequestError } from "../analytics/Analytics.util";

const ApiClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

ApiClient.interceptors.response.use((res) => res, interceptErrorResponse);

function interceptErrorResponse(error: AxiosError) {
  const { message: errorMessage, code: statusText = "" } = error;
  const { method = "", baseURL: baseUrl = "", url = "" } = error.config;
  const statusCode = error.response?.status as number;

  trackRequestError({ method, baseUrl, url, errorMessage, statusText, statusCode });

  console.log("Network Error: ", error);
  throw error;
}

export default ApiClient;
