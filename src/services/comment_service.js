import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

export const addComment = async (
  news_id,
  content
) => {
  const response =
    await axiosInstance.post(
      API_ROUTES.COMMENTS.CREATE,
      {
        news_id,
        content,
        parent_comment_id: null,
      }
    );

  return response.data;
};

export const getComments =
  async (newsId) => {
    const response =
      await axiosInstance.get(
        API_ROUTES.COMMENTS.GET_BY_NEWS_ID(
          newsId
        )
      );

    return response.data;
  };