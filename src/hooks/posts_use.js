"use client";

import { useState } from "react";
import { getMyNews } from "@/services/posts_service";

export const useAdminNews = () => {
  const [loading, setLoading] = useState(false);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      return await getMyNews();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchMyPosts,
  };
};