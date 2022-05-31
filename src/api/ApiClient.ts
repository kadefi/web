import axios, { AxiosError } from "axios";

// const API_URL = "https://kadefi-api.herokuapp.com/api/v1"
const API_URL = "http://localhost:3001/api/v1";

const ApiClient = axios.create({ baseURL: API_URL });

ApiClient.interceptors.response.use((res) => res, interceptErrorResponse);

function interceptErrorResponse(error: AxiosError) {
  console.log("Network Error: ", error);
  throw error;
}

export default ApiClient;
