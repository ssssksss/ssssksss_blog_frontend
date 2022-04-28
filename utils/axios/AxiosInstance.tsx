import axios from "axios";
const AxiosInstance = axios.create({
  withCredentials: true,
  //baseURL: "http://localhost:8080",
  baseURL: "https://blog-server.ssssksss.xyz",
  //timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export default AxiosInstance;
