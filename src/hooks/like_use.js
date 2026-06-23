"use client";

import { useState } from "react";

import {
  likeNews,
  unlikeNews,
} from "@/services/like_service";

export const useLikes = () => {
  const [loading, setLoading] =
    useState(false);

  const addLike = async (
    newsId
  ) => {
    try {
      setLoading(true);

      return await likeNews(
        newsId
      );
    } finally {
      setLoading(false);
    }
  };

  const removeLikeHandler =
    async (newsId) => {
      try {
        setLoading(true);

        return await unlikeNews(
          newsId
        );
      } finally {
        setLoading(false);
      }
    };

  return {
    loading,
    addLike,
    removeLike:
      removeLikeHandler,
  };
};