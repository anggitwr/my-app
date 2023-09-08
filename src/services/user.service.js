import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://take-home-test-api.nutech-integrasi.app/";

const getProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

const getBalance = () => {
  return axios.get(API_URL + "balance", { headers: authHeader() });
};

const getService = () => {
  return axios.get(API_URL + "services", { headers: authHeader() });
};

const getBanner = () => {
  return axios.get(API_URL + "banner", { headers: authHeader() });
};

const postTopUp = () => {
  return axios.post(API_URL + "topup", { headers: authHeader() });
};

const userService = {
  getProfile,
  getBalance,
  getService,
  getBanner,
  postTopUp,
};

export default userService;
