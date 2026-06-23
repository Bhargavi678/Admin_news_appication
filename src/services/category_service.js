import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.ADMIN_CATEGORIES.GET_ALL
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch categories",
      }
    );
  }
};
const loadCategories = async () => {
  try {
    const response = await fetchCategories();

    console.log("CATEGORIES RESPONSE", response);

    setCategories(response.data);
  } catch (error) {
    console.log(error);
  }
};