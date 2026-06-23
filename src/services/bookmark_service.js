import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiroutes";

export const getBookmarks =
  async () => {
    const response =
      await axiosInstance.get(
        API_ROUTES.BOOKMARKS.GET_ALL
      );

    return response.data;
  };

export const addBookmark =
  async (newsId) => {
    const response =
      await axiosInstance.post(
        API_ROUTES.BOOKMARKS.ADD,
        {
          news_id: newsId,
        }
      );

    return response.data;
  };

export const removeBookmark =
  async (newsId) => {
    const response =
      await axiosInstance.delete(
        API_ROUTES.BOOKMARKS.DELETE(
          newsId
        )
      );

    return response.data;
  };