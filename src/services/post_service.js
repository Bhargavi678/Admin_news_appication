import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

// CREATE NEWS
export const createNews = async (formData) => {
  try {
    const response = await axiosInstance.post(
      API_ROUTES.USER_POST.CREATE,
      formData
    );

    return response.data;
  } catch (error) {
    console.log(
      "CREATE NEWS ERROR:",
      error.response?.data
    );

    throw (
      error.response?.data || {
        message: "News creation failed",
      }
    );
  }
};

// PUBLISH NEWS
export const publishNews = async (newsId) => {
  try {
    const response = await axiosInstance.put(
      API_ROUTES.USER_POST.PUBLISH(newsId)
    );

    return response.data;
  } catch (error) {
    console.log(
      "PUBLISH ERROR:",
      error.response?.data
    );

    throw (
      error.response?.data || {
        message: "Publish failed",
      }
    );
  }
};

// MY POSTS
export const getAdminNews = async () => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.USER_POST.MY_POSTS
    );

    return response.data;
  } catch (error) {
    console.log(
      "GET NEWS ERROR:",
      error.response?.data
    );

    throw (
      error.response?.data || {
        message: "Failed to fetch news",
      }
    );
  }
};