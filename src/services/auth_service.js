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
// USER LOGIN
// ====================
export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      API_ROUTES.AUTH.LOGIN,
      payload
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Login failed",
      }
    );
  }
};

// ====================
// ADMIN LOGIN
// ====================
export const adminLogin = async (payload) => {
  try {
    const response = await axiosInstance.post(
      API_ROUTES.ADMIN_AUTH.LOGIN,
      payload
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Admin login failed",
      }
    );
  }
};