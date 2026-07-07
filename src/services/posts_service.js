import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

// CREATE NEWS
export const createNews = async (formData) => {
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
};

// PUBLISH NEWS
export const publishNews = async (newsId) => {
  const response = await axiosInstance.put(
    API_ROUTES.USER_POST.PUBLISH(newsId)
  );

  return response.data;
};

// MY NEWS
export const getMyNews = async () => {
  const response = await axiosInstance.get(
    API_ROUTES.USER_POST.MY_POSTS
  );

  return response.data;
};