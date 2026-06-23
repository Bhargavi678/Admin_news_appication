import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

export const likeNews = async (
  newsId
) => {
  const response =
    await axiosInstance.post(
      API_ROUTES.LIKES.LIKE,
      {
        news_id: newsId,
      }
    );

  return response.data;
};

export const unlikeNews =
  async (newsId) => {
    const response =
      await axiosInstance.delete(
        API_ROUTES.LIKES.UNLIKE(
          newsId
        )
      );

    return response.data;
  };