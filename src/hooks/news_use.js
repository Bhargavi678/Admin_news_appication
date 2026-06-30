"use client";

import { useState } from "react";
import {
  getAllNews,
  getNewsById,
  sharePost,
  getMyPosts,
} from "@/services/news_service";

export const useNews = () => {
  const [loading, setLoading] = useState(false);

  // ======================
  // GET ALL NEWS
  // ======================

  const fetchNews = async () => {
    try {
      setLoading(true);

      const response = await getAllNews();

      return response;
    } finally {
      setLoading(false);
    }
  };
  // ======================
// GET MY POSTS
// ======================

const fetchMyPosts = async () => {
  try {
    setLoading(true);

    return await getMyPosts();
  } finally {
    setLoading(false);
  }
};

  // ======================
  // GET NEWS DETAILS
  // ======================

  const fetchNewsDetails = async (newsId) => {
    try {
      setLoading(true);

      const response = await getNewsById(newsId);

      return response;
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // SHARE NEWS
  // ======================

  const shareNews = async (newsId) => {
    try {
      const response = await sharePost(newsId);

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
  loading,
  fetchNews,
  fetchNewsDetails,
  fetchMyPosts,
  sharePost: shareNews,
};
};