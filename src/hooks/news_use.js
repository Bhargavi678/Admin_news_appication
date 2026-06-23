"use client";

import { useState } from "react";
import {
  getAllNews,
  getNewsById,
  shareNews,
} from "@/services/news_service";


export const useNews = () => {
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const response =
        await getAllNews();

      return response;
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsDetails = async (
    newsId
  ) => {
    try {
      setLoading(true);

      const response =
        await getNewsById(newsId);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const shareNews = async (newsId) => {
    try {
      setLoading(true);

      const response = await shareNews(newsId);

      return response;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchNews,
    fetchNewsDetails,
    shareNews,
  };
};