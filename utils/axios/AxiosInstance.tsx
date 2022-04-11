import axios from "axios";
const AxiosInstance = axios.create({
  //baseURL: "http://localhost:8080",
  //baseURL: "https://blog-server.ssssksss.xyz:8443",
  //baseURL: "http://blog-server.ssssksss.xyz",
  baseURL: "http://146.56.117.239:8080",
  //timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  //withCredentials: true,
});
export default AxiosInstance;
