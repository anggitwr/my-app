import axios from "axios";

const API_URL = "https://take-home-test-api.nutech-integrasi.app/";

const register = (email, first_name, last_name, password) => {
  return axios.post(API_URL + "registration", {
    email,
    first_name,
    last_name,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
