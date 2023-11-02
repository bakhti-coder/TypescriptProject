import axios from "axios";
import { ENDPOINT, TOKEN } from "../constants";
import Cookies from "js-cookie";
// import { message } from "antd";

const request = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
  headers: { Authorization: `Bearer ${Cookies.get(TOKEN)}` },
});

// request.interceptors.response.use(
//   (response) => response,
//   (err) => {
//     message.error(err.response.data, { autoClose: 1000 });

//     return Promise.reject(err);
//   }
// );

export default request;
