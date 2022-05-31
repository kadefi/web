import axios, { AxiosError } from "axios";

const ApiClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

ApiClient.interceptors.response.use((res) => res, interceptErrorResponse);

function interceptErrorResponse(error: AxiosError) {
  console.log("Network Error: ", error);
  throw error;
}

export default ApiClient;
