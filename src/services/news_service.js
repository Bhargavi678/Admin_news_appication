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
    console.error(
      "Get News Error:",
      error.response?.data || error.message
    );

    throw error;
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
    console.error(
      "Get News Details Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================
// SHARE NEWS
// ======================

export const sharePost = async (newsId) => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.NEWS.SHARE(newsId)
    );

    console.log("Share API Response:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Share News Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================
// GET MY POSTS
// ======================

export const getMyPosts = async () => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.USER_POST.MY_POSTS
    );

    return response.data;
  } catch (error) {
    console.error(
      "Get My Posts Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};