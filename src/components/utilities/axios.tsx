import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// Khởi tạo Axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

//Interceptor trước khi gửi request
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // console.log("Sending request:", config);
    return config;
  },
  (error: AxiosError) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Interceptor sau khi nhận response
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("Response received:", response);
    return response && response.data ? response.data : response;
  },
  (error: AxiosError) => {
    // console.error("Response error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
