import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

export const getCategories = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No access token found");
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid JWT Token");
  }

  const payload = JSON.parse(atob(parts[1]));

  console.log("JWT Payload:", payload);

  let url = "";

  switch (payload.role) {
    case "admin":
      url = API_ROUTES.ADMIN_CATEGORIES.GET_ALL;
      break;

    case "user":
      url = API_ROUTES.USER_CATEGORIES.GET_ALL;
      break;

    default:
      throw new Error("Invalid user role");
  }

  console.log("Calling API:", url);

  const response = await axiosInstance.get(url);

  return response.data;
};