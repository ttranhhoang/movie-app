import axios from "axios";
import queryString from "query-string";
import { base_url } from "./constants";


// const getFirebaseToken = async ()=>{
//   const currentUser = auth.currentUser;
//   if(currentUser) return currentUser.getIdToken();
// }
// // Not logged in 
// const hasRememberedAccount = localStorage.getItem('');

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  responseType: "json",
  paramsSerializer: (params) => queryString.stringify(params),
});

// axiosClient.interceptors.request.use(async (config) => {
//   const token = await getFirebaseToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
