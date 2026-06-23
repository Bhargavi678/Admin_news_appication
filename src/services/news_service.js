import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

// ======================
// GET ALL NEWS
// ======================
export const getAllNews = async () => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.NEWS.GET_ALL
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch news",
      }
    );
  }
};

// ======================
// GET NEWS DETAILS
// ======================
export const getNewsById = async (newsId) => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.NEWS.GET_BY_ID(newsId)
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch news details",
      }
    );
  }
};

export const shareNews = async (
  newsId
) => {
  const response =
    await axiosInstance.get(
      API_ROUTES.NEWS.SHARE(
        newsId
      )
    );

  return response.data;
};