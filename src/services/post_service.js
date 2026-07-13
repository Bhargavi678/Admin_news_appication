import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

// CREATE NEWS
export const createNews = async (formData) => {
  try {
    const response = await axiosInstance.post(
      API_ROUTES.USER_POST.CREATE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("CREATE NEWS ERROR:", error.response?.data);
    throw error;
  }
};

// PUBLISH NEWS
export const publishNews = async (newsId) => {
  const response = await axiosInstance.put(
    API_ROUTES.USER_POST.PUBLISH(newsId)
  );

  return response.data;
};

// MY POSTS
export const getAdminNews = async () => {
  const response = await axiosInstance.get(
    API_ROUTES.USER_POST.MY_POSTS
  );

  return response.data;
};