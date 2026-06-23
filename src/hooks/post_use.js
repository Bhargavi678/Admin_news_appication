"use client";

import { useState } from "react";

import {
  createNews,
  publishNews,
  getAdminNews,
} from "@/services/post_service";

export const useAdminNews =
  () => {
    const [loading, setLoading] =
      useState(false);

    const addNews = async (
      newsData
    ) => {
      try {
        setLoading(true);

        return await createNews(
          newsData
        );
      } finally {
        setLoading(false);
      }
    };

    const publishNewsItem =
      async (newsId) => {
        try {
          setLoading(true);

          return await publishNews(
            newsId
          );
        } finally {
          setLoading(false);
        }
      };

    const fetchAdminNews =
      async () => {
        try {
          setLoading(true);

          return await getAdminNews();
        } finally {
          setLoading(false);
        }
      };

    return {
      loading,

      addNews,
      publishNewsItem,
      fetchAdminNews,
    };
  };