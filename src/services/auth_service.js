import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

// ====================
// USER REGISTER
// ====================

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      API_ROUTES.AUTH.REGISTER,
      payload
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Registration failed",
      }
    );
  }
};

// ====================
// LOGIN
// ====================

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      API_ROUTES.ADMIN_AUTH.LOGIN,
      payload
    );

    const data = response.data.data;

    localStorage.setItem(
      "access_token",
      data.access_token
    );

    localStorage.setItem(
      "role",
      data.role
    );

    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Login failed",
      }
    );
  }
};