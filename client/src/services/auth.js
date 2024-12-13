import toast from "react-hot-toast";
import {
  loginError,
  loginStart,
  loginSuccess,
  logout,
} from "../store/slices/auth";
import { configuration, URL } from "../utils";
import axios from "axios";

// Admin login
const loginAdmin = async (dispatch, navigate, credentials) => {
  dispatch(loginStart());

  try {
    const { data } = await axios.post(
      `${URL}/auth/login`,
      credentials,
      configuration
    );
    dispatch(loginSuccess(data.admin));
    toast.success(data.message);
    navigate("/hrms");
  } catch (error) {
    dispatch(loginError());
    toast.error(error.response?.data.message || "Client : " + error.message);
  }
};

// Admin logout
const logoutAdmin = async (dispatch, navigate) => {
  try {
    const { data } = await axios.get(`${URL}/auth/logout`, configuration);
    dispatch(logout());
    toast.success(data.message);
    if (data.success) navigate("/");
  } catch (error) {
    toast.error(error.response?.data.message || "Client : " + error.message);
  }
};

export { loginAdmin, logoutAdmin };
